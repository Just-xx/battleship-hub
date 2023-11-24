import styled from "styled-components";
import illustration from "../../assets/hero-illustration.png";
import { darken, rgba } from "polished";
import { motion } from "framer-motion";

export const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 500px;

  @media screen and (max-width: 1400px) {
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    align-items: start;
  }
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 48px;
  font-size: 1.55rem;
  font-weight: 900;
  opacity: 0.9;
`;

export const Illustration = styled.div`
  aspect-ratio: 563/531.19;
  margin-left: 64px;
  display: block;
  max-width: 510px;
  width: 100%;
  opacity: 0.8;
  background-image: url(${illustration});
  background-size: cover;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;

  @media screen and (max-width: 1400px) {
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    align-items: start;
  }
`;

export const ButtonsWrapper = styled(InputsWrapper)`
  margin-bottom: 0;
  flex-direction: row;
  gap: 16px;
  margin-top: 32px;

  button,
  a {
    flex-grow: 1;
    padding-left: 8px;
    padding-right: 8px;
    min-width: auto;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 12px;
  width: 100%;
  pointer-events: all;

  div {
    width: 100%;
    position: relative;
  }

  i {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: #000;
    opacity: 0.6;
    cursor: pointer;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 5px;
    transition: background-color 120ms linear;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }

  label {
    font-size: 0.888rem;
    font-weight: 700;
    opacity: 0.5;
    color: #000;
  }

  input {
    border-radius: 12px;
    padding: 16px;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    transition: opacity 120ms linear;
    font-size: 0.888rem;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    cursor: ${props => (props.$copy ? "pointer" : "auto")};
    caret-color: ${props => (props.$copy ? "transparent" : "auto")};
    opacity: ${props => (props.$copy ? ".8" : "1")};
    border-color: ${props =>
      props.$copy ? "transparent" : "rgba(0, 0, 0, 0.1)"};

    &:hover {
      opacity: 1;
    }

    &:disabled {
      opacity: 0.8;
      border-color: transparent;
    }
  }

  @media screen and (max-width: 1400px) {
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    align-items: start;
  }
`;

export const InfoBox = styled(motion.div)`
  padding: 16px;
  background-color: ${({ theme }) => rgba(theme.primary, 0.1)};
  font-size: 0.777rem;
  line-height: 150%;
  font-weight: 600;
  color: ${({ theme }) => rgba(theme.primary, 0.9)};
  border-radius: 10px;
  margin-top: 24px;
  width: 100%;

  &::after {
    content: '';
    animation-name: ${props => props.$animate ? 'waitingAnim' : 'none'};;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes waitingAnim {
    0% {
      content: '.';
    }
    
    50% {
      content: '..';
    }
    
    100% {
      content: '...';
    }
  }
  
`;

export function TextInput({ label, name, copy, onClick, ...props }) {
  return (
    <InputWrapper onClick={onClick} $copy={copy}>
      <label htmlFor={name}>{label}</label>
      <div>
        <input type="text" name={name} id={name} {...props} />
        {copy && <i className="fa-regular fa-copy"></i>}
      </div>
    </InputWrapper>
  );
}
