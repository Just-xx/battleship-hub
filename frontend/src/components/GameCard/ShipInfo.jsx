import React from "react";
import { ShipsWrapper, ShipsTypeInfo, Ship } from "./GameCard.styles";

import ships_small_p from "../../assets/ships_p/small.svg";
import ships_regular_p from "../../assets/ships_p/regular.svg";
import ships_medium_p from "../../assets/ships_p/medium.svg";
import ships_big_p from "../../assets/ships_p/big.svg";

import ships_small_o from "../../assets/ships_o/small.svg";
import ships_regular_o from "../../assets/ships_o/regular.svg";
import ships_medium_o from "../../assets/ships_o/medium.svg";
import ships_big_o from "../../assets/ships_o/big.svg";

export default function ShipInfo({ $secondary }) {
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
        <Ship $secondary src={ships.big} />
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        <Ship $secondary src={ships.medium} />
        <Ship $secondary src={ships.medium} />
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        <Ship $secondary src={ships.regular} />
        <Ship $secondary src={ships.regular} />
        <Ship $secondary src={ships.regular} />
      </ShipsTypeInfo>
      <ShipsTypeInfo $secondary>
        <Ship $secondary src={ships.small} />
        <Ship $secondary src={ships.small} />
        <Ship $secondary src={ships.small} />
        <Ship $secondary src={ships.small} />
      </ShipsTypeInfo>
    </ShipsWrapper>
  );
}
