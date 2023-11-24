import React from "react";
import { Wrapper, Dimm, Text } from "./Modal.styles";
import { AnimatePresence } from "framer-motion";
import { Button } from "../Button/Button";

export default function Modal({ text, buttonText, action, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <Dimm
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Wrapper
            initial={{
              opacity: 0,
              translateY: "calc(-50% - 10px)",
              translateX: "-50%",
            }}
            animate={{
              opacity: 1,
              translateY: "calc(-50% - 0px)",
              translateX: "-50%",
            }}
            exit={{
              opacity: 0,
              translateY: "calc(-50% - 10px)",
              translateX: "-50%",
            }}
          >
            <Text>{text}</Text>
            <Button $secondary onClick={action}>
              {buttonText}
            </Button>
          </Wrapper>
        </>
      )}
    </AnimatePresence>
  );
}
