import React from 'react'
import Card from "../Card";
import { Title, Illustration, TextInput, ActionWrapper, InputsWrapper, ButtonsWrapper } from "../CardUtils";
import { Button } from '../../Button/Button';

export default function LobbyCard() {
  return (
    <Card>
      <ActionWrapper>
        <Title>Create game</Title>
        <InputsWrapper>
          <TextInput label="Your nickname" name="nickname" />
          <TextInput label="Game code" name="gamecode" disabled value="FGDSAG34TGFXZGFX"/>
          <TextInput label="Oponnent" name="oponnent" />
        </InputsWrapper>
        <ButtonsWrapper>
          <Button $small>Start game</Button>
          <Button $small $secondary>Quit Game</Button>
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  )
}
