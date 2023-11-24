import React from "react";
import {
  RowSignsWrapper,
  NumberSign,
  ColumnSignsWrapper,
  LetterSign,
} from "./GameCard.styles.jsx";

export default function GridLabel() {
  return (
    <>
      <RowSignsWrapper>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(num => (
          <NumberSign>{num}</NumberSign>
        ))}
      </RowSignsWrapper>
      <ColumnSignsWrapper>
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(num => (
          <LetterSign>{num}</LetterSign>
        ))}
      </ColumnSignsWrapper>
    </>
  );
}
