import styled from 'styled-components';
import { LinkButton } from '../../Button/Button'

export const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media screen and (max-width: 1400px) {
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    align-items: start;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  height: 250px;

  @media screen and (max-width: 900px) {
    height: 210px;
  }

  @media screen and (max-width: 600px) {
    height: 180px;
  }
`;

export const BigButton = styled(LinkButton)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 1rem;
  font-weight: 800;
  width: auto;
  padding: 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 0px;
  min-width: auto;

  
  i {
    font-size: 4rem;
    opacity: .8;
  
    @media screen and (max-width: 700px){
      font-size: 3.5rem;
    }
  }

`