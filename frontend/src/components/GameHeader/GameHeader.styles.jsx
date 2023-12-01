import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 32px;
  position: relative;

  > button {
    flex-grow: 0;
    padding: 16px 48px;
    font-size: 0.777rem;
  }
`;