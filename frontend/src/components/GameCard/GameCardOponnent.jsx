import React from "react";
import {
  Wrapper,
  GameGridCell,
  GameGrid,
  InnerWrapper,
  Title,
  ShipsGrid,
} from "./GameCard.styles.jsx";
import ShipInfo from "./ShipInfo.jsx";

export default function GameCard() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Oponnent's grid</Title>
        <ShipInfo $secondary />
        <GameGrid $secondary>
          {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((row) => 
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
              (column) => (
                <GameGridCell
                  key={row + column}
                  data-row={row}
                  data-column={column}
                  $secondary
                ></GameGridCell>
              )
            )
          )}
          <ShipsGrid>
            
          </ShipsGrid>
        </GameGrid>
      </InnerWrapper>
    </Wrapper>
  );
}
