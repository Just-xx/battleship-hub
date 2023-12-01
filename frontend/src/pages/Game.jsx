import React, { useContext } from "react";
import GameCardPlayer from "../components/GameCard/GameCardPlayer";
import GameCardOponnent from "../components/GameCard/GameCardOponnent";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import ActionModal from '../components/Modal/ActionModal'
import GameHeader from "../components/GameHeader/GameHeader";
import { useGameSocket } from "../hooks/useGameSocket";
import { RoomContext } from "../contexts/RoomContext";
import { useNavigate } from "react-router-dom";
import trophyIcon from '../assets/trophy.png'
import shipwreckIcon from '../assets/shipwreck.png'
import conlostIcon from '../assets/conlost.png'

export default function Play() {

  const { roomState } = useContext(RoomContext);
  const { connectionLost, lost, won, oponnentNickname, opponentLeft, handleGuess, handleQuit } = useGameSocket();
  const navigate = useNavigate();

  return (
    <>
      <GameHeader handleQuit={handleQuit} />
      <GameGridsWrapper>
        <GameCardPlayer
          hits={roomState.hits.own}
          shipsPattern={roomState.patterns.own}
        />
        <GameCardOponnent
          oponnentHits={roomState.hits.opponent}
          disabled={roomState.userType !== roomState.turn}
          handleGuess={handleGuess}
          oponnentNickname={oponnentNickname}
        />
      </GameGridsWrapper>
      <ActionModal
        visible={won}
        img={trophyIcon}
        text="You won the game"
        buttonText="Back to menu"
        action={() => navigate("/play")}
      />
      <ActionModal
        visible={lost}
        img={shipwreckIcon}
        text="You lost the game"
        buttonText="Back to menu"
        action={() => navigate("/play")}
        />
      <ActionModal
        visible={opponentLeft}
        img={conlostIcon}
        text="Opponent has left the game"
        buttonText="Back to menu"
        action={() => navigate("/play")}
        />
      <ActionModal
        visible={connectionLost && !opponentLeft}
        img={conlostIcon}
        text="Connection lost"
        buttonText="Back to menu"
        action={() => navigate("/play")}
      />
      {/* {!lost && !won && !connectionLost  && (
        <Modal
          visible={connectionLost}
          text="You left the game"
          buttonText="Back to menu"
          action={() => navigate("/play")}
        />
      )} */}
    </>
  );
}
const GameGridsWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 64px;
`;
