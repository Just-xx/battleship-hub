import React from "react";
import styled from "styled-components";
import illustration from "../../assets/hero-illustration.png";

const Wrapper = styled.section`
  width: 100%;
  padding: 64px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 6px 6px 25px 0px rgba(0, 0, 0, 0.05),
    2px 2px 4px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;

  @media screen and (max-width: 1400px) {
    text-align: center;
    justify-content: center;
  }
`;

export default function Card({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}
