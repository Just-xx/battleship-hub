import React from 'react'
import GameCardPlayer from '../components/GameCard/GameCardPlayer'
import GameCardOponnent from '../components/GameCard/GameCardOponnent'
import styled from 'styled-components';


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
  return (
    <GameGridsWrapper>
      <GameCardPlayer />
      <GameCardOponnent />
    </GameGridsWrapper>
  )
}
