import SocketIOService from "../services/SocketIOService";
import { useEffect, useState, useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
import { useNavigate } from "react-router-dom";
import { stringIntoNumber } from "../utils/stringIntoNumber";

export function useGameSocket() {
  const [oponnentNickname, setOponnentNickname] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [connectionLost, setConnectionLost] = useState(false);
  const [opponentLeft, setOLeft] = useState(false);

  const { roomState, dispatchRoom } = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomState.connectedToRoom) {
      navigate("/play");
      return () => SocketIOService.io.off();
    }

    SocketIOService.connectToServer();

    SocketIOService.io.emit("unfreeze", {
      userType: roomState.userType,
      roomId: roomState.roomId,
      playerNickname: roomState.playerNickname,
      hostNickname: roomState.hostNickname,
      prevSocketId: roomState.id,
    });

    SocketIOService.io.on("clientStart", () => {
      dispatchRoom({ type: "UNFREEZE" });
      if (roomState.userType === "host")
        setOponnentNickname(roomState.playerNickname);
      else if (roomState.userType === "player")
        setOponnentNickname(roomState.hostNickname);
    });

    SocketIOService.io.on("patternProposal", payload => {
      dispatchRoom({
        type: "SET_PATTERN",
        payload: { pattern: payload.pattern },
      });
    });

    SocketIOService.io.on("oponnentPattern", payload => {
      dispatchRoom({
        type: "SET_O_PATTERN",
        payload: { pattern: payload.pattern },
      });
    });

    SocketIOService.io.on("turn", payload => {
      dispatchRoom({ type: "SET_TURN", payload: { turn: payload.turn } });
    });

    SocketIOService.io.on("playerQuit", () => {
      if (roomState.userType === "host") setOLeft(true);
      setConnectionLost(true);
      SocketIOService.disconnectFromServer()();
    });

    SocketIOService.io.on("hostQuit", () => {
      SocketIOService.disconnectFromServer()();
      if (roomState.userType === "player") setOLeft(true);
      setConnectionLost(true);
    });

    SocketIOService.io.on("disconnect", () => {
      if (!won || !lost) {
        setConnectionLost(true);
      }
    });

    SocketIOService.io.on("hit", payload => {
      if (payload.userType === roomState.userType) {
        dispatchRoom({
          type: "ADD_O_HIT",
          payload: {
            x: payload.x,
            y: payload.y,
            struck: payload.struck,
            shipType: payload?.ship?.type,
            shipId: payload?.ship?.id,
          },
        });
      } else {
        dispatchRoom({
          type: "ADD_HIT",
          payload: {
            x: payload.x,
            y: payload.y,
            struck: payload.struck,
            shipType: payload?.ship?.type,
            shipId: payload?.ship?.id,
          },
        });
      }
    });

    SocketIOService.io.on("win", () => {
      setWon(true);
    });

    SocketIOService.io.on("lost", () => {
      setLost(true);
    });

    return () => {
      SocketIOService.io.off();
    };
  }, []);

  useEffect(() => {

    window.onbeforeunload = function(){
      return 'Are you sure you want to leave?';
    };

    return () => {
      SocketIOService.io.off();
      SocketIOService.disconnectFromServer()();
      dispatchRoom({ type: "RESET" });
    };
  }, []);

  function handleGuess(e) {
    const { row, column } = e.target.dataset;
    SocketIOService.io.emit("guess", {
      y: parseInt(stringIntoNumber(row)),
      x: parseInt(column),
      roomId: roomState.roomId,
      userType: roomState.userType,
    });
  }

  function handleQuit() {
    navigate("/play?quit=1");
  }

  return {
    oponnentNickname,
    lost,
    won,
    connectionLost,
    opponentLeft,
    handleGuess,
    handleQuit,
  };
}
