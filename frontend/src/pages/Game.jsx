import React, { useContext, useEffect, useState } from "react";
import GameCardPlayer from "../components/GameCard/GameCardPlayer";
import GameCardOponnent from "../components/GameCard/GameCardOponnent";
import styled from "styled-components";
import { socket } from "../utils/socket";
import { RoomContext } from "../contexts/RoomContext";
import { useNavigate } from "react-router-dom";
import { stringIntoNumber } from "../utils/stringIntoNumber";
import Modal from '../components/Modal/Modal';

const GameGridsWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

export default function Play() {
  const [roomState, dispatchRoom] = useContext(RoomContext);
  const [oponnentNickname, setOponnentNickname] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [connectionLost, setconnectionLost] = useState(false);

  const navigate = useNavigate();

  console.log(roomState);
  

  useEffect(() => {
    if (!roomState.connectedToRoom) {
      navigate('/play');
      return () => socket.io.off();
    }

    socket.connectToServer();
    
    socket.io.emit("unfreeze", {
      userType: roomState.userType,
      roomId: roomState.roomId,
      playerNickname: roomState.playerNickname,
      hostNickname: roomState.hostNickname,
      prevSocketId: roomState.id
    });

    socket.io.on("clientStart", () => {
      dispatchRoom({ type: "UNFREEZE" });
      if (roomState.userType === "host")
        setOponnentNickname(roomState.playerNickname);
      else if (roomState.userType === "player")
        setOponnentNickname(roomState.hostNickname);
    });

    socket.io.on("pattern", payload => {
      console.log(payload);
      dispatchRoom({ type: "SET_PATTERN", pattern: payload.pattern })
      dispatchRoom({ type: "SET_STRUCKED_SHIPS", pattern: payload.pattern})
    })

    socket.io.on("oponnentPattern", pattern => {
      dispatchRoom({ type: "SET_STRUCKED_OPONNENT_SHIPS", pattern: pattern })
    })

    socket.io.on("turn", payload => {
      dispatchRoom({ type: "SET_TURN", turn: payload.turn })
    })

    socket.io.on("playerQuit", () => {
      socket.disconnectFromServer()();
      setconnectionLost(true);
    });

    socket.io.on("hostQuit", () => {
      socket.disconnectFromServer()();
      setconnectionLost(true);
    });
    
    socket.io.on("disconnect", () => {
      setconnectionLost(true);
    });

    socket.io.on("hit", payload => {
      if (payload.userType === roomState.userType) {
          dispatchRoom({ type: "ADD_OPONNENT_HIT", x: payload.x, y: payload.y, struck: payload.struck, shipType: payload?.ship?.type || null });
          if (payload?.ship) {
            dispatchRoom({ type: "ADD_OPONNENT_STRUCK", id: payload.ship.id, shipType: payload.ship.type })
          }
      }
      else {
        dispatchRoom({ type: "ADD_HIT", x: payload.x, y: payload.y, struck: payload.struck, shipType: payload?.ship?.type });
        if (payload?.ship) {
          dispatchRoom({ type: "ADD_STRUCK", id: payload.ship.id, shipType: payload.ship.type })
        }
      }
    })

    socket.io.on("win", () => {
      setWon(true);
    })

    socket.io.on("lost", () => {
      setLost(true);
    })

    return () => {
      socket.io.off();
    };
  }, []);

  useEffect(() => () => {
    socket.io.off();
    socket.disconnectFromServer()();
    dispatchRoom({ type: "RESET" });
  }, [])

  function handleGuess(e) {
    const { row, column } = e.target.dataset
    socket.io.emit('guess', {
      y: parseInt(stringIntoNumber(row)),
      x: parseInt(column),
      roomId: roomState.roomId,
      userType: roomState.userType
    })
  }

  return (
    <>
      <GameGridsWrapper>
        <GameCardPlayer hits={roomState.hits} shipsPattern={roomState.pattern} />
        <GameCardOponnent oponnentHits={roomState.oponnentHits} disabled={roomState.userType !== roomState.turn} handleGuess={handleGuess} oponnentNickname={oponnentNickname} />
      </GameGridsWrapper>
      <Modal visible={won} text="You won the game" buttonText="Back to menu" action={() => navigate("/play")} />
      <Modal visible={lost} text="You lost the game" buttonText="Back to menu" action={() => navigate("/play")} />
      {(!lost && !won) && (
        <Modal visible={connectionLost} text="Connection lost" buttonText="Back to menu" action={() => navigate("/play")} />
      )}
    </>
  );
}
