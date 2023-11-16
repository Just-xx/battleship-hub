import React, { useContext, useEffect, useState } from "react";
import GameCardPlayer from "../components/GameCard/GameCardPlayer";
import GameCardOponnent from "../components/GameCard/GameCardOponnent";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { RoomContext } from "../contexts/RoomContext";
import { useNavigate } from "react-router-dom";

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
  const [playRedirect, setPlayRedirect] = useState(false);
  const [roomState, dispatchRoom] = useContext(RoomContext);

  const [oponnentNickname, setOponnentNickname] = useState("");
  const [pattern, setPattern] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomState.connectedToRoom) {
      setPlayRedirect(true);
      return () => socket.io.off();
    }

    socket.connectToServer();

    socket.io.emit("unfreeze", {
      userType: roomState.userType,
      roomId: roomState.roomId,
      playerNickname: roomState.playerNickname,
      hostNickname: roomState.hostNickname,
    });

    socket.io.on("clientStart", () => {
      dispatchRoom({ type: "UNFREZZE" });
      if (roomState.userType === "host")
        setOponnentNickname(roomState.playerNickname);
      else if (roomState.userType === "player")
        setOponnentNickname(roomState.hostNickname);

    });

    socket.io.on("pattern", payload => {
      setPattern(payload.pattern);
    })

    socket.io.on("playerQuit", () => {
      alert("Oponnent quit the game");
      navigate("/create");
    });

    socket.io.on("hostQuit", () => {
      alert("Host quit the game");
      navigate("/join");
    });

    return () => {
      socket.io.off();
    };
  }, []);

  useEffect(() => () => {
    socket.io.off();
  }, [])

  if (playRedirect) {
    return <Navigate to="/play" />;
  }

  return (
    <GameGridsWrapper>
      <GameCardPlayer shipsPattern={pattern} />
      <GameCardOponnent oponnentNickname={oponnentNickname} />
    </GameGridsWrapper>
  );
}
