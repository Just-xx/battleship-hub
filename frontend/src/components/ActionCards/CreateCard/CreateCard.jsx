import React from "react";
import Card from "../Card";
import { Title, Illustration } from "../CardUtils";
import { ButtonsWrapper, BigButton, ActionWrapper } from './CreateCard.styles'

export default function CreateCard() {
  return (
    <Card>
      <ActionWrapper>
        <Title>Play online</Title>
        <ButtonsWrapper>
          <BigButton to="/lobby">
            <i className="fa-solid fa-plus"></i>
            <span>Create game</span>
          </BigButton>
          <BigButton $secondary to="/join">
            <i className="fa-solid fa-user-plus"></i>
            <span>Join game</span>
          </BigButton>
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  );
}
