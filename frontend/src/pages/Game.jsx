import React, { useEffect } from 'react'
import GameCardPlayer from '../components/GameCard/GameCardPlayer'
import GameCardOponnent from '../components/GameCard/GameCardOponnent'
import styled from 'styled-components';
import { io } from 'socket.io-client'


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

  useEffect(() => {

    console.log(import.meta.env.VITE_WS_URL)
    const socket = io(`${import.meta.env.VITE_WS_URL}`);

    // Handle socket events
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('message', () => {
      console.log('Received message');
    });

    return () => {
      // Clean up when the component unmounts
      socket.disconnect();
    };
  }, [])

  return (
    <GameGridsWrapper>
      <GameCardPlayer />
      <GameCardOponnent />
    </GameGridsWrapper>
  )
}
