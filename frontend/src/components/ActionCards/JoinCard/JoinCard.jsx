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
import { socket } from "../../../utils/socket";
import { RoomContext } from "../../../contexts/RoomContext";
import { useNavigate } from "react-router-dom";

export default function LobbyCard() {
  const [successInfoShown, setSuccesInfoShown] = useState(false);
  const [failInfoShown, setFailInfoShown] = useState(false);

  const [roomIdSnapshot, setRoomIdSnapshot] = useState("");

  const [nickname, setNickname] = useState("ABCD");
  const [inputRoomId, setInputRoomId] = useState("");

  const navigate = useNavigate();
  const [roomState, dispatchRoom] = useContext(RoomContext);

  useEffect(() => {
    socket.io.on("connect", () => {
      dispatchRoom({ type: "RESET" });
      dispatchRoom({ type: "SET_PLAYER_USERTYPE" });
      dispatchRoom({ type: "CONNECT" });
    });

    socket.io.on("disconnect", () => {
      dispatchRoom({ type: "RESET" });
      setSuccesInfoShown(false);
    });

    socket.io.on("requestData", () => {
      socket.io.emit("gameData", {
        playerNickname: nickname,
        roomId: roomState.roomId,
      });
      dispatchRoom({ type: "SET_PLAYER_NICKNAME", playerNickname: nickname });
    });
    
    socket.io.on("hostInfo", payload => {
      dispatchRoom({ type: "SET_HOST_NICKNAME", hostNickname: payload.hostNickname });
    })

    socket.io.on("roomId", payload => {
      if (payload.success) {
        setSuccesInfoShown(true);
        setFailInfoShown(false);
        dispatchRoom({ type: "CONNECT_TO_ROOM", roomId: payload.roomId });
        dispatchRoom({ type: "SET_ID", id: payload.socketId });
      } else {
        setSuccesInfoShown(false);
        setFailInfoShown(true);
        setRoomIdSnapshot(inputRoomId);
        socket.disconnectFromServer()();
      }
    });

    socket.io.on("gameStart", payload => {
      dispatchRoom({ type: "FREEZE" });
      socket.io.off("disconnect");
      navigate(`/game?roomId=${roomState.roomId}`);
    });

    socket.io.on("hostQuit", () => {
      setSuccesInfoShown(false);
      socket.disconnectFromServer()();
    });

    return () => {
      socket.io.off()
    };
  }, [nickname, inputRoomId, successInfoShown, roomState]);

  useEffect(() => {
    return () => {
      socket.disconnectFromServer()();
      dispatchRoom({ type: "RESET" });
      socket.io.off();
    };
  }, []);

  const handleJoin = () => {
    socket.connectToServer();
    socket.io.emit("joinRoom", {
      roomId: inputRoomId,
      playerNickname: nickname,
    });
  };

  const handleQuit = () => {
    socket.disconnectFromServer()();
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
          />
          <TextInput
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
            >
              You are in game ({roomState.roomId})<br />
              Wait for host to start the game...
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
          <Button $small onClick={handleJoin} disabled={roomState.connected}>
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
