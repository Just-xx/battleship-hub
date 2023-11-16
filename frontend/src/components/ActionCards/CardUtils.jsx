import styled from 'styled-components';
import illustration from "../../assets/hero-illustration.png";
import { darken, rgba } from "polished";
import { motion } from 'framer-motion';


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

  button, a {
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

  label {
    font-size: 0.888rem;
    font-weight: 700;
    opacity: .5;
    color: #000;
  }

  input {
    border-radius: 10px;
    padding: 16px;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    transition: opacity 120ms linear;

    &:disabled {
      pointer-events: none;
      cursor: default;
      opacity: .8;
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
`;

export function TextInput({ label, name, ...props }) {
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} {...props}/>
    </InputWrapper>
  );
}