import React, { useEffect, useState } from "react";
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
} from "./GameCard.styles.jsx";
import ShipInfo from "./ShipInfo/ShipInfo.jsx";
import Ship from "./Ship.jsx";
import { coordsToCss } from "../../utils/coordsToCss.js";

export default function GameCard({ shipsPattern, hits }) {

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Your grid</Title>
        <ShipInfo />
        <GameGrid>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(row =>
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(column => (
              <GameGridCell
                key={row + "-" + column}
                data-row={row}
                data-column={column}
              ></GameGridCell>
            ))
          )}
          <ShipsGrid>
            {shipsPattern.map(data => (
              <Ship key={`${data.columnStart}-${data.rowStart}`} {...data} />
            ))}
          </ShipsGrid>
          {hits.map(hit =>
            hit.struck ? (
              <HitMarkStruck
                $player
                key={`${hit.y}-${hit.x}`}
                style={coordsToCss(hit.x, hit.y)}
              />
            ) : (
              <HitMarkMissed
                $player
                key={`${hit.y}-${hit.x}`}
                style={coordsToCss(hit.x, hit.y)}
              />
            )
          )}
        </GameGrid>
      </InnerWrapper>
    </Wrapper>
  );
}
