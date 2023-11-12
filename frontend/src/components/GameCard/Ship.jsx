import React from "react";
import styled from "styled-components";

import ship_regular from "../../assets/ships_grid/regular.svg";
import ship_small from '../../assets/ships_grid/small.svg'
import ship_medium from '../../assets/ships_grid/medium.svg'
import ship_big from '../../assets/ships_grid/big.svg'

const ShipComonn = styled.div`
  pointer-events: all;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  transition: background-color 50ms linear, border-color 50ms linear;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
  }
`

const ShipSmall = styled(ShipComonn)`
  background-image: url(${ship_small});
  background-size: fill;
  background-position: center;
  background-repeat: no-repeat;
`;

const ShipRegular= styled(ShipComonn)`
  position: relative;
  overflow: hidden;

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    transform: ${props => props.$rotate ? "rotate(270deg) scale(1.5)" : "scale(0.8)"};
  }
`;

const ShipMedium = styled(ShipRegular)`
  img {
    transform: ${props => props.$rotate ? "rotate(270deg) scale(2.4)" : "scale(0.8)"};
  }
`;

const ShipBig = styled(ShipRegular)`
  img {
    transform: ${props => props.$rotate ? "rotate(270deg) scale(3) scaleX(1.15)" : "scale(0.8)"};
  }
`;

export default function Ship({
  rowStart,
  rowEnd,
  columnStart,
  columnEnd,
  type
}) {
  
  const sizeCSS = {
    gridRow: `${rowStart}/${Number(rowEnd) + 1}`,
    gridColumn: `${columnStart}/${Number(columnEnd) + 1}`,
  };

  let rotate = false;
  if (Number(columnStart) === Number(columnEnd)) rotate = true; 

  return (() => {
    switch(type) {
      case "small":
        return <ShipSmall style={{...sizeCSS}} />
      case "regular":
        return <ShipRegular style={{...sizeCSS}} $rotate={rotate}><img src={ship_regular} alt="" /></ShipRegular>
      case "medium":
        return <ShipMedium style={{...sizeCSS}} $rotate={rotate}><img src={ship_medium} alt="" /></ShipMedium>
      case "big":
        return <ShipBig style={{...sizeCSS}} $rotate={rotate}><img src={ship_big} alt="" /></ShipBig>
    }
  })();
}
