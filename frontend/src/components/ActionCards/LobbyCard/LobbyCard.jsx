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
import { socket } from "../../../utils/socket";
import { RoomContext } from "../../../contexts/RoomContext";
import { useNavigate } from "react-router-dom";


export default function LobbyCard() {
  const [nickname, setNickname] = useState("Player1");
  const [roomState, dispatchRoom] = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    socket.io.on("connect", () => {
      socket.io.emit("createRoom");
      dispatchRoom({ type: "RESET" });
      dispatchRoom({ type: "SET_HOST_USERTYPE" });
      dispatchRoom({ type: "CONNECT" });
    });

    socket.io.on("disconnect", () => {
      disconnectRoomState();
    });

    socket.io.on("roomId", payload => {
      dispatchRoom({ type: "CONNECT_TO_ROOM", roomId: payload.roomId });
      dispatchRoom({ type: "SET_ID", id: payload.socketId });
    });

    socket.io.on("playerJoin", payload => {
      dispatchRoom({
        type: "SET_PLAYER_NICKNAME",
        playerNickname: payload.playerNickname,
      });
    });

    socket.io.on("requestData", () => {
      socket.io.emit("gameData", {
        hostNickname: nickname,
        roomId: roomState.roomId,
      });
      dispatchRoom({ type: "SET_HOST_NICKNAME", hostNickname: nickname });
    });

    socket.io.on("gameStart", () => {
      dispatchRoom({ type: "FREEZE" });
      socket.io.removeListener("disconnect");
      navigate(`/game?roomId=${roomState.roomId}`);
    });

    socket.io.on("playerQuit", () => {
      dispatchRoom({ type: "PLAYER_QUIT" });
    });

    return () => { socket.io.off() };
  }, [nickname, roomState]);

  useEffect(() => {

    socket.connectToServer();

    return () => {
      socket.disconnectFromServer()();
      dispatchRoom({ type: "RESET" });
      socket.io.off();
    };
  }, []);

  const handleStart = () => {
    socket.io.emit("requestStart", { roomId: roomState.roomId });
  };

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
          />
          <TextInput
            label="Game code"
            name="gamecode"
            disabled
            value={roomState.roomId || "-"}
          />
          <TextInput
            label="Oponnent"
            name="oponnent"
            value={roomState.playerNickname || "-"}
            disabled
          />
        </InputsWrapper>
        <ButtonsWrapper>
          <Button $small onClick={handleStart} disabled={!(roomState.connectedToRoom && roomState.playerNickname)}>
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
