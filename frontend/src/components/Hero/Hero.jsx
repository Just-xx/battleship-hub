import React from "react";
import {
  Wrapper,
  TextWrapper,
  ButtonsWrapper,
  ActionWrapper,
  IllustrationWrapper,
  Illustration,
  IllustrationBadge,
  MobileButtonsWrapper
} from "./Hero.styles";
import { H1, H3 } from "../Headings/Headings";
import { LinkButton } from "../Button/Button";
import illustration from "../../assets/hero-illustration.png";

export default function Hero() {
  return (
    <Wrapper>
      <ActionWrapper>
        <TextWrapper>
          <H1>Battleships</H1>
          <H3>Just click to start the game!</H3>
        </TextWrapper>
        <ButtonsWrapper>
          <LinkButton to="/play">Play now</LinkButton>
          <LinkButton to="#rules" $secondary>
            Rules
          </LinkButton>
        </ButtonsWrapper>
      </ActionWrapper>
      <IllustrationWrapper>
        <Illustration draggable="false" src={illustration} alt="" />
        <IllustrationBadge $left={"40px"} $top={"0px"}>
          Classic game
        </IllustrationBadge>
        <IllustrationBadge $bottom={"0px"} $right={"40px"} $centerBottom>
          1v1
        </IllustrationBadge>
      </IllustrationWrapper>
      <MobileButtonsWrapper>
        <LinkButton $autoWidth to="/play">Play now</LinkButton>
        <LinkButton $autoWidth to="#rules" $secondary>
          Rules
        </LinkButton>
      </MobileButtonsWrapper>
    </Wrapper>
  );
}
