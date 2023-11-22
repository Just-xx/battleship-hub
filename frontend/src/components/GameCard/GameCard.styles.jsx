import styled from "styled-components";
import { darken, lighten, rgba } from "polished";


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
  transition: opacity 120ms linear;

  opacity: ${props => props.$disabled ? 0.5 : 1};
  pointer-events: ${props => props.$disabled ? "none" : "all"};
  
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
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
  transition: 20ms linear background-color;
  cursor: ${props => props.$secondary ? "pointer" : "default"};

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

export const HitGrid = styled(ShipsGrid)``;

export const HitMark = styled.i`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  color: rgb(235, 64, 52, 0.8);
  background-color: rgb(235, 64, 52, 0.1);

  color: ${props => props.$player ? "rgb(235, 64, 52, 1)" : "rgb(235, 64, 52, 0.8)"};
  background-color: ${props => props.$player ? "rgb(235, 64, 52, 0.4)": "rgb(235, 64, 52, 0.1)"};
  border: ${props => props.$player ? "2px solid rgb(235, 64, 52, 1)" : "2px solid rgb(235, 64, 52, 0.5)"};

  &::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-size: 1.222rem;
  }
`
export const HitMarkStruck = styled(HitMark).attrs({ className: "fa-solid fa-xmark" })`
  pointer-events: all;
  cursor: default;
`;

export const HitMarkMissed = styled(HitMark).attrs({ className: "fa-solid fa-circle" })`
  color: rgb(0, 0, 0, 0.8);
  background-color: rgb(0, 0, 0, 0.05);

  color: ${props => props.$player ? "rgb(24, 242, 235, 0.5)": "rgb(0, 0, 0, 0.7)"};
  background-color: ${props => props.$player ? "rgb(24, 242, 235, 0.1)": "rgb(0, 0, 0, 0.05)"};
  border: ${props => props.$player ? "1px solid rgb(24, 242, 235, 0.4)": "1px solid rgb(0, 0, 0, 0.1)"};


  &::before {
    font-size: 0.777rem;
  }
`

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 32px;
  align-self: center;
  font-size: 0.888rem;
  font-weight: 900;
  opacity: 0.9;
`;
