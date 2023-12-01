import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import {
  Title,
  Illustration,
  TextInput,
  ActionWrapper,
  InputsWrapper,
  ButtonsWrapper,
  InfoBox,
} from "../CardUtils";
import { Button, LinkButton } from "../../Button/Button";
import { AnimatePresence } from "framer-motion";
import SocketIOService from "../../../services/SocketIOService";
import { RoomContext } from "../../../contexts/RoomContext";
import { useNavigate } from "react-router-dom";

export default function LobbyCard() {
  const [successInfoShown, setSuccesInfoShown] = useState(false);
  const [failInfoShown, setFailInfoShown] = useState(false);

  const [roomIdSnapshot, setRoomIdSnapshot] = useState("");

  const [nickname, setNickname] = useState("");
  const [inputRoomId, setInputRoomId] = useState("");

  const navigate = useNavigate();
  const {roomState, dispatchRoom} = useContext(RoomContext);

  useEffect(() => {
    SocketIOService.io.on("connect", () => {
      dispatchRoom({ type: "RESET" });
      dispatchRoom({ type: "SET_PLAYER_USERTYPE" });
      dispatchRoom({ type: "CONNECT" });
    });

    SocketIOService.io.on("disconnect", () => {
      dispatchRoom({ type: "RESET" });
      setSuccesInfoShown(false);
    });

    SocketIOService.io.on("requestData", () => {
      SocketIOService.io.emit("gameData", {
        playerNickname: nickname,
        roomId: roomState.roomId,
      });
      dispatchRoom({
        type: "SET_PLAYER_NICKNAME",
        payload: { playerNickname: nickname },
      });
    });

    SocketIOService.io.on("hostInfo", payload => {
      dispatchRoom({
        type: "SET_HOST_NICKNAME",
        payload: { hostNickname: payload.hostNickname },
      });
    });

    SocketIOService.io.on("roomIdProposal", payload => {
      if (payload.success) {
        setSuccesInfoShown(true);
        setFailInfoShown(false);
        dispatchRoom({
          type: "CONNECT_TO_ROOM",
          payload: { roomId: payload.roomId },
        });
        dispatchRoom({ type: "SET_ID", payload: { id: payload.socketId } });
      } else {
        setSuccesInfoShown(false);
        setFailInfoShown(true);
        setRoomIdSnapshot(inputRoomId);
        SocketIOService.disconnectFromServer()();
      }
    });

    SocketIOService.io.on("gameStart", payload => {
      dispatchRoom({ type: "FREEZE" });
      SocketIOService.io.off("disconnect");
      navigate(`/game?roomId=${roomState.roomId}`);
    });

    SocketIOService.io.on("hostQuit", () => {
      setSuccesInfoShown(false);
      SocketIOService.disconnectFromServer()();
    });

    return () => {
      SocketIOService.io.off();
    };
  }, [nickname, inputRoomId, successInfoShown, roomState]);

  useEffect(() => {
    dispatchRoom({ type: "RESET" });
    return () => {
      SocketIOService.disconnectFromServer()();
      dispatchRoom({ type: "RESET" });
      SocketIOService.io.off();
    };
  }, []);

  const handleJoin = () => {
    SocketIOService.connectToServer();
    SocketIOService.io.emit("joinRoom", {
      roomId: inputRoomId,
      playerNickname: nickname,
    });
  };

  const handleQuit = () => {
    SocketIOService.disconnectFromServer()();
  };

  return (
    <Card>
      <ActionWrapper>
        <Title>Join game</Title>
        <InputsWrapper>
          <TextInput
            label="Your nickname"
            name="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            disabled={roomState.connected}
            placeholder="Nickname here"
          />
          <TextInput
            placeholder="Game code here"
            label="Game code"
            name="gamecode"
            value={inputRoomId}
            onChange={e => setInputRoomId(e.target.value)}
            disabled={roomState.connected}
          />
        </InputsWrapper>
        <AnimatePresence>
          {successInfoShown && (
            <InfoBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              $animate
            >
              You are in game ({roomState.roomId})<br />
              Wait for host to start the game
            </InfoBox>
          )}
          {failInfoShown && (
            <InfoBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Unable to join "{roomIdSnapshot}"
            </InfoBox>
          )}
        </AnimatePresence>
        <ButtonsWrapper>
          <Button $small onClick={handleJoin} disabled={roomState.connected || !inputRoomId.length || !nickname.length}>
            Join game
          </Button>
          {roomState.connectedToRoom ? (
            <Button $small $secondary onClick={handleQuit}>
              Quit Game
            </Button>
          ) : (
            <LinkButton to="/play" $small $secondary onClick={handleQuit}>
              Go back
            </LinkButton>
          )}
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  );
}
