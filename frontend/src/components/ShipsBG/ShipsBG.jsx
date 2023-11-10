import React from 'react'
import ships from '../../assets/ships_bg.png'
import { styled } from 'styled-components';

const ShipsImg = styled.div`
width: 100%;
  height: 80px;
  justify-self: end;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(1px);
  opacity: .2;
  z-index: -1;
  background-image: url(${ships});
  background-repeat: repeat;
`;


export default function ShipsBG() {
  return (
    <ShipsImg />
  )
}
