import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { darken, rgba } from "polished";

const primaryHover = (props) => css`
  &:hover {
    background-color: ${darken(0.03, props.theme.primary)};
  }
`;

const secondaryHover = (props) => css`
  &:hover {
    background-color: ${darken(0.05, rgba(props.theme.primary, 0.1))};
  }
`;

const small = (props) => css`
  font-size: 0.888rem;
  font-weight: 700;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.$secondary ? rgba(props.theme.primary, 0.05) : props.theme.primary};
  color: ${(props) => (props.$secondary ? props.theme.primary : "#fff")};
  padding: 24px 48px;
  font-size: 0.888rem;
  font-weight: 800;
  border: ${(props) =>
    props.$secondary ? "1px solid rgba(78, 43, 37, 0.30)" : "none"};
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.$secondary
      ? "none"
      : "3px 3px 20px 0px rgba(0, 0, 0, 0.10), 2px 2px 4px 0px rgba(0, 0, 0, 0.08)"};
  min-width: ${(props) => (props.$autoWidth ? "auto" : "13rem")};
  flex-grow: ${(props) => (props.$autoWidth ? "1" : "0")};
  cursor: pointer;
  white-space: nowrap;

  transition: background-color 80ms linear, opacity 120ms linear;

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: .8;
    box-shadow: none;
  }

  ${(props) =>
    props.$secondary ? secondaryHover(props) : primaryHover(props)};

  

  @media screen and (max-width: 600px) {
    padding: 16px 24px;
    border-radius: 10px;
  }

  ${(props) => (props.$small ? small(props) : "")};
`;

export const LinkButton = styled(Button).attrs({ as: Link })`
  text-align: center;
  text-decoration: none;
`;
