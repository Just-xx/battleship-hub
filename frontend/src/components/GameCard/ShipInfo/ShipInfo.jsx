import React, { useEffect, useState } from "react";
import {
  ShipsWrapper,
  ShipsTypeInfo,
  ShipInfoItem,
  ShipInfoWrapper,
  ShipInfoItemStrucks,
  ShipHitMarkStruck,
} from "./ShipInfo.styles";
import { RoomContext } from "../../../contexts/RoomContext";
import { useContext } from "react";

import ships_small_p from "../../../assets/ships_p/small.svg";
import ships_regular_p from "../../../assets/ships_p/regular.svg";
import ships_medium_p from "../../../assets/ships_p/medium.svg";
import ships_big_p from "../../../assets/ships_p/big.svg";

import ships_small_o from "../../../assets/ships_o/small.svg";
import ships_regular_o from "../../../assets/ships_o/regular.svg";
import ships_medium_o from "../../../assets/ships_o/medium.svg";
import ships_big_o from "../../../assets/ships_o/big.svg";

export default function ShipInfo({ $secondary }) {
  const [shipsInfo, setShipsInfo] = useState([]);
  const { roomState } = useContext(RoomContext);

  useEffect(() => {
    if (!$secondary) {
      setShipsInfo(
        roomState.patterns.own.map(ship => ({
          id: ship.id,
          strucks: ship.strucks,
          type: ship.type,
        }))
      );
    } else {
      setShipsInfo(roomState.patterns.opponent);
    }
  }, [roomState]);

  const ships = $secondary
    ? {
        big: ships_big_o,
        medium: ships_medium_o,
        regular: ships_regular_o,
        small: ships_small_o,
      }
    : {
        big: ships_big_p,
        medium: ships_medium_p,
        regular: ships_regular_p,
        small: ships_small_p,
      };

  return (
    <ShipsWrapper $secondary>
      <ShipsTypeInfo $secondary>
        {shipsInfo.map(
          ship =>
            ship.type === "big" && (
              <ShipInfoWrapper key={ship.id}>
                <ShipInfoItem $secondary src={ships.big} />
                <ShipInfoItemStrucks $big>
                  {Array.from({ length: ship.strucks }, () => 1).map((n, i) => (
                    <ShipHitMarkStruck key={i}></ShipHitMarkStruck>
                  ))}
                </ShipInfoItemStrucks>
              </ShipInfoWrapper>
            )
        )}
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        {shipsInfo.map(
          ship =>
            ship.type === "medium" && (
              <ShipInfoWrapper key={ship.id}>
                <ShipInfoItem $secondary src={ships.medium} />
                <ShipInfoItemStrucks $medium>
                  {Array.from({ length: ship.strucks }, () => 1).map((n, i) => (
                    <ShipHitMarkStruck key={i}></ShipHitMarkStruck>
                  ))}
                </ShipInfoItemStrucks>
              </ShipInfoWrapper>
            )
        )}
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        {shipsInfo.map(
          ship =>
            ship.type === "regular" && (
              <ShipInfoWrapper key={ship.id}>
                <ShipInfoItem $secondary src={ships.regular} />
                <ShipInfoItemStrucks $regular>
                  {Array.from({ length: ship.strucks }, () => 1).map((n, i) => (
                    <ShipHitMarkStruck key={i}></ShipHitMarkStruck>
                  ))}
                </ShipInfoItemStrucks>
              </ShipInfoWrapper>
            )
        )}
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        {shipsInfo.map(
          ship =>
            ship.type === "small" && (
              <ShipInfoWrapper key={ship.id}>
                <ShipInfoItem $secondary src={ships.small} />
                <ShipInfoItemStrucks $small>
                  {Array.from({ length: ship.strucks }, () => 1).map((n, i) => (
                    <ShipHitMarkStruck key={i}></ShipHitMarkStruck>
                  ))}
                </ShipInfoItemStrucks>
              </ShipInfoWrapper>
            )
        )}
      </ShipsTypeInfo>
    </ShipsWrapper>
  );
}
