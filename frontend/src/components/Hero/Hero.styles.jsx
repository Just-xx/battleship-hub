import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 64px;
  padding-bottom: 100px;
  margin-bottom: 64px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    gap: 48px;
    align-items: center;
    text-align: center;
    width: fit-content;
  }

  @media screen and (max-width: 600px) {
    align-items: start;
    text-align: left;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-top: 64px;
  position: relative;

  @media screen and (max-width: 1480px) {
    gap: 48px;
    margin-top: 48px;
  }

  @media screen and (max-width: 1200px) {
    margin-top: 0px;
    margin-bottom: 16px;
  }
`;

export const IllustrationWrapper = styled.div`
  user-select: none;
  position: relative;
  aspect-ratio: 563/531.19;
  width: 100%;
  max-width: 600px;

  @media screen and (max-width: 1200px) {
    height: 400px;
    width: auto;
  }

  @media screen and (max-width: 600px) {
    height: auto;
    width: 100%;
  }
`;

export const Illustration = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  box-shadow: 17px 15px 35px 0px rgba(0, 0, 0, 0.15),
    1px 2px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  opacity: .9;
`;

export const IllustrationBadge = styled.div`
  position: absolute;
  top: ${(props) => props.$top || "auto"};
  left: ${(props) => props.$left || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  right: ${(props) => props.$right || "auto"};
  padding: 16px 48px;
  border-radius: 15px;
  transform: ${(props) =>
    props.$centerBottom ? "translateY(50%)" : "translateY(-50%)"};
  font-size: 0.77rem;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.39);

  background: linear-gradient(
    3deg,
    rgba(255, 255, 255, 0.82) -2.22%,
    rgba(255, 255, 255, 0.29) 101.63%
  );

  box-shadow: 13px 10px 20px 0px rgba(0, 0, 0, 0.15),
    2px 1px 9px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);

  color: rgba(78, 43, 37, 0.8);

  @media screen and (max-width: 1200px) {
    padding: 12px 32px;
    border-radius: 10px;
  }
`;

export const MobileButtonsWrapper = styled.div`
  display: none;
  gap: 16px;
  width: 100%;

  @media screen and (max-width: 1200px) {
    display: flex;
  }
`;

export const GridBgImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateY(100%) translateX(-50%);
  max-width: 400px;
  width: 25vw;
  aspect-ratio: 1;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;