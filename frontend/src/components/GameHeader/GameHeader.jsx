import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wrapper } from "./GameHeader.styles";
import Logo from '../Logo/Logo'
import { Button } from "../Button/Button";

export default function GameHeader({ handleQuit }) {


  return (
    <Wrapper>
      <Logo />
      <Button $small $secondary $autoWidth onClick={handleQuit}>Quit game</Button>
    </Wrapper>
  );
}
