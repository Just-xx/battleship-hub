import React from "react";
import styled from 'styled-components';
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
`;

const LogoText = styled.span`
  font-size: 0.777rem;
  line-height: 110%;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
`;

const LogoImg = styled.img`
  object-fit: contain;
  height: 2rem;
  opacity: 0.9;
`;

export default function Logo({ link }) {
  return (
    <LogoWrapper to="/">
      <LogoImg src={logo} alt="" />
      <LogoText>
        Battleships
        <br />
        Hub
      </LogoText>
    </LogoWrapper>
  );
}
