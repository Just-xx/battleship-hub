import React from 'react'
import Card from "../Card";
import { Title, Illustration, TextInput, ActionWrapper, InputsWrapper, ButtonsWrapper } from "../CardUtils";
import { Button } from '../../Button/Button';

export default function LobbyCard() {
  return (
    <Card>
      <ActionWrapper>
        <Title>Join game</Title>
        <InputsWrapper>
          <TextInput label="Your nickname" name="nickname" />
          <TextInput label="Game code" name="gamecode" />
        </InputsWrapper>
        <ButtonsWrapper>
          <Button $small>Join game</Button>
          <Button $small $secondary>Quit Game</Button>
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  )
}
