import React from "react";
import {
  Wrapper,
  GameGridCell,
  GameGrid,
  InnerWrapper,
  Title,
  ShipsGrid,
  HitGrid,
  HitMarkStruck,
  HitMarkMissed,
  GameGridWrapper,
} from "./GameCard.styles.jsx";
import ShipInfo from "./ShipInfo/ShipInfo.jsx";
import { coordsToCss } from "../../utils/coordsToCss.js";
import GridLabel from "./GridLabel.jsx";

export default function GameCardOponnent({
  oponnentNickname,
  handleGuess,
  disabled,
  oponnentHits,
}) {

  

  return (
    <Wrapper>
      <InnerWrapper $disabled={disabled}>
        <Title>{oponnentNickname}'s grid</Title>
        <ShipInfo $secondary />
        <GameGridWrapper>
          <GridLabel />
          <GameGrid $secondary>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(row =>
              ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(column => (
                <GameGridCell
                  key={row + column}
                  data-row={row}
                  data-column={column}
                  onClick={handleGuess}
                  $secondary
                ></GameGridCell>
              ))
            )}
            <ShipsGrid></ShipsGrid>
            <HitGrid>
              {oponnentHits.map(hit => hit.struck ? (
                <HitMarkStruck key={`${hit.y}-${hit.x}`} style={coordsToCss(hit.x, hit.y)} />
              ) : (
                <HitMarkMissed key={`${hit.y}-${hit.x}`} style={coordsToCss(hit.x, hit.y)} />
              ))}
            </HitGrid>
          </GameGrid>
        </GameGridWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}
