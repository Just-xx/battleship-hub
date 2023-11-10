import React from "react";
import styled from "styled-components";
import illustration from "../../assets/hero-illustration.png";

const Wrapper = styled.section`
  width: 100%;
  padding: 64px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 6px 6px 25px 0px rgba(0, 0, 0, 0.01),
    2px 2px 4px 0px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1400px) {
    text-align: center;
    justify-content: center;
  }
`;

export default function Card({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}
