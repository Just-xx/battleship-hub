import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import {
  Title,
  Illustration,
  TextInput,
  ActionWrapper,
  InputsWrapper,
  ButtonsWrapper,
} from "../CardUtils";
import { Button, LinkButton } from "../../Button/Button";
import SocketIOService from "../../../services/SocketIOService";
import { RoomContext } from "../../../contexts/RoomContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LobbyCard() {
  const [nickname, setNickname] = useState("");
  const {roomState, dispatchRoom} = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    SocketIOService.io.on("connect", () => {
      dispatchRoom({ type: "RESET" });
      dispatchRoom({ type: "SET_HOST_USERTYPE" });
      dispatchRoom({ type: "CONNECT" });
      SocketIOService.io.emit("createRoomReq");
    });

    SocketIOService.io.on("disconnect", () => {
      disconnectRoomState();
    });

    SocketIOService.io.on("roomIdProposal", payload => {
      dispatchRoom({
        type: "CONNECT_TO_ROOM",
        payload: { roomId: payload.roomId },
      });
      dispatchRoom({ type: "SET_ID", payload: { id: payload.socketId } });
    });

    SocketIOService.io.on("playerJoin", payload => {
      dispatchRoom({
        type: "SET_PLAYER_NICKNAME",
        payload: { playerNickname: payload.playerNickname },
      });
    });

    SocketIOService.io.on("requestData", () => {
      SocketIOService.io.emit("gameData", {
        hostNickname: nickname,
        roomId: roomState.roomId,
      });
      dispatchRoom({ type: "SET_HOST_NICKNAME", payload: { hostNickname: nickname} });
    });

    SocketIOService.io.on("gameStart", () => {
      dispatchRoom({ type: "FREEZE" });
      SocketIOService.io.removeListener("disconnect");
      navigate(`/game?roomId=${roomState.roomId}`);
    });

    SocketIOService.io.on("playerQuit", () => {
      dispatchRoom({ type: "PLAYER_QUIT" });
    });

    return () => {
      SocketIOService.io.off();
    };
  }, [nickname, roomState]);

  useEffect(() => {
    dispatchRoom({ type: "RESET" });
    SocketIOService.connectToServer();

    return () => {
      SocketIOService.disconnectFromServer()();
      dispatchRoom({ type: "RESET" });
      SocketIOService.io.off();
    };
  }, []);

  const handleStart = () => {
    SocketIOService.io.emit("requestStart", { roomId: roomState.roomId });
  };

  function handleCodeCopy() {
    const code = roomState.roomId;

    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.info("Code copied");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  }

  return (
    <Card>
      <ActionWrapper>
        <Title>Create game</Title>
        <InputsWrapper>
          <TextInput
            label="Your nickname"
            name="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Nickname here"
          />
          <TextInput
            label="Game code"
            name="gamecode"
            value={roomState.roomId || "generating..."}
            copy
            onClick={handleCodeCopy}
          />
          <TextInput
            label="Oponnent"
            name="oponnent"
            value={roomState.playerNickname}
            placeholder="Opponent's nickname will be displayed here"
            disabled
          />
        </InputsWrapper>
        <ButtonsWrapper>
          <Button
            $small
            onClick={handleStart}
            disabled={!(roomState.connectedToRoom && roomState.playerNickname && nickname)}
          >
            Start game
          </Button>
          <LinkButton to="/play" $small $secondary>
            Quit Game
          </LinkButton>
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  );
}
