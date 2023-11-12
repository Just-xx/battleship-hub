import React, { useState } from "react";
import Card from "../Card";
import {
  Title,
  Illustration,
  TextInput,
  ActionWrapper,
  InputsWrapper,
  ButtonsWrapper,
  InfoBox,
} from "../CardUtils";
import { Button } from "../../Button/Button";
import { AnimatePresence } from "framer-motion";

export default function LobbyCard() {
  const [infoShown, setInfoShown] = useState(true);

  const oponnent = {
    nickname: "PLAYER123",
  };

  return (
    <Card>
      <ActionWrapper>
        <Title>Join game</Title>
        <InputsWrapper>
          <TextInput label="Your nickname" name="nickname" />
          <TextInput label="Game code" name="gamecode" />
        </InputsWrapper>
        <AnimatePresence>
          {infoShown && (
            <InfoBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              You are in game with “{oponnent.nickname}”<br />
              Wait for host to start the game...
            </InfoBox>
          )}
        </AnimatePresence>
        <ButtonsWrapper>
          <Button $small>Join game</Button>
          <Button $small $secondary>
            Quit Game
          </Button>
        </ButtonsWrapper>
      </ActionWrapper>
      <Illustration />
    </Card>
  );
}
