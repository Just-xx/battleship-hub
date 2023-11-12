import React, { useEffect, useState } from "react";
import {
  Wrapper,
  GameGridCell,
  GameGrid,
  InnerWrapper,
  Title,
  ShipsGrid
} from "./GameCard.styles.jsx";
import ShipInfo from "./ShipInfo.jsx";
import Ship from "./Ship.jsx";


export default function GameCard() {

  const [shipsPattern, setShipsPattern] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pattern`, { method: "GET" })
      .then(res => res.json())
      .then(data => {setShipsPattern(data)})
  }, [])

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Your grid</Title>
        <ShipInfo />
        <GameGrid>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((row) => 
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
              (column) => (
                <GameGridCell
                  key={row + "-" + column}
                  data-row={row}
                  data-column={column}
                ></GameGridCell>
              )
            )
          )}
          <ShipsGrid>
            {shipsPattern.map(data => <Ship key={`${data.columnStart}-${data.rowStart}`} {...data}/>)}
          </ShipsGrid>
        </GameGrid>
      </InnerWrapper>
    </Wrapper>
  );
}
