import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 48px 0 80px 0;
  position: relative;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  gap: 64px;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: 500;
  font-size: 1rem;

  @media screen and (max-width: 700px) {
    font-weight: 600;
  }
`;

export const Hamburger = styled.i`
  font-size: 1.2rem;
  cursor: pointer;
  display: none !important;

  &:focus {
    outline: none;
    border: none;
  }

  @media screen and (max-width: 700px) {
    display: block !important;
  }
`;

export const MobileNavigationMenu = styled.div`
  position: relative;
  display: none;
  flex-direction: column;
  gap: 24px;
  position: absolute;
  text-align: right;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 16px));
  background-color: #fff;
  padding: 28px;
  border-radius: 10px;
  box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.02),
    2px 2px 4px 0px rgba(0, 0, 0, 0.02);
  user-select: none;
  z-index: 100;

  &:focus {
    outline: none;
    border: none;
  }

  @media screen and (max-width: 700px) {
    display: flex;
  }
`;

export const AngleIcon = styled.i`
  position: absolute;
  top: 5px;
  right: 50%;
  transform: translateX(50%);
  opacity: .2;
`;
