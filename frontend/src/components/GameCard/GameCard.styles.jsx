import styled from "styled-components";
import { darken, lighten, rgba } from "polished";


import ships_small_p from "../../assets/ships_p/small.svg";
import ships_regular_p from "../../assets/ships_p/regular.svg";
import ships_medium_p from "../../assets/ships_p/medium.svg";
import ships_big_p from "../../assets/ships_p/big.svg";

import ships_small_o from "../../assets/ships_o/small.svg";
import ships_regular_o from "../../assets/ships_o/regular.svg";
import ships_medium_o from "../../assets/ships_o/medium.svg";
import ships_big_o from "../../assets/ships_o/big.svg";


export const Wrapper = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 6px 6px 25px 0px rgba(0, 0, 0, 0.01),
    2px 2px 4px 0px rgba(0, 0, 0, 0.02);

`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 65%;
  min-width: 300px;
  
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
`;

export const ShipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
  overflow-x: auto;
`;

export const ShipsTypeInfo = styled.div`
  display: flex;
  max-width: 100%;
  gap: 8px;
`;

export const Ship = styled.img`
  background-color: ${props => props.$secondary ? darken(0.05, "#fff") : rgba(props.theme.primary, 0.05)};
  border: 1px solid ${props => props.$secondary ? darken(0.2, "#fff") : rgba(props.theme.primary, 0.2)};
  padding: 6px;
  border-radius: 5px;
  height: 32px;
  width: auto;
  object-fit: contain;
  display: block;
`;

export const GameGrid = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  aspect-ratio: 1;
  background-color: ${props => props.$secondary ? "rgba(0, 0, 0, 0.2)" : rgba(props.theme.primary, 0.8)};
  box-shadow: ${props => props.$secondary ? "none" : "17px 15px 35px 0px rgba(0, 0, 0, 0.15), 1px 2px 5px 0px rgba(0, 0, 0, 0.15)"};
  border: ${props => props.$secondary ? "1px solid rgba(0, 0, 0, 0.05)" : "none"};
  gap: 1px;
  border-radius: 15px;
  overflow: hidden;
`;

export const GameGridCell = styled.div`
  background-color: ${(props) => props.$secondary ? "#fff" : props.theme.primary};
  transition: 30ms linear background-color;

  &:hover {
    background-color: ${(props) => props.$secondary ? darken(0.05, "#fff") : lighten(0.03, props.theme.primary)};
  }
`;

export const ShipsGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 32px;
  align-self: center;
  font-size: 0.888rem;
  font-weight: 900;
  opacity: 0.9;
`;
