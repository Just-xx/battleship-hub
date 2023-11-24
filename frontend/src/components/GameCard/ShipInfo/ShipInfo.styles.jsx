import styled from 'styled-components';
import { HitMarkStruck } from '../GameCard.styles';
import { darken } from 'polished';

export const ShipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
  overflow-x: auto;
`;

export const ShipsTypeInfo = styled.div`
  display: flex;
  max-width: 100%;
  gap: 8px;
`;

export const ShipInfoWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
`;

export const ShipInfoItem = styled.img`
  background-color: ${props => props.$secondary ? darken(0.05, "#fff") : rgba(props.theme.primary, 0.05)};
  border: 1px solid ${props => props.$secondary ? darken(0.2, "#fff") : rgba(props.theme.primary, 0.2)};
  padding: 6px;
  border-radius: 5px;
  height: 32px;
  width: auto;
  object-fit: contain;
`;

export const ShipInfoItemStrucks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-columns: ${props => props.$big ? "repeat(4, 1fr)" : ""};
  grid-template-columns: ${props => props.$medium ? "repeat(3, 1fr)" : ""};
  grid-template-columns: ${props => props.$regular ? "repeat(2, 1fr)" : ""};
  grid-template-columns: ${props => props.$small ? "repeat(1, 1fr)" : ""};
`

export const ShipHitMarkStruck = styled(HitMarkStruck)`
  opacity: 1;

  color: rgb(235, 64, 52, 1);
  background-color: rgb(235, 64, 52, 0.05);
  border: 2px solid rgb(235, 64, 52, 0.2);

  &::before {
    font-size: 0.95rem;
  }
`;