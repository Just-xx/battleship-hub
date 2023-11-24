import { createGlobalStyle, ThemeProvider, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background-color: #F2F2F2;
  }

  * {
    font-family: 'Mulish', sans-serif;
    box-sizing: border-box;
  }

  html, body, #root {
    font-size: 18px;
    width: 100%;
    min-height: 100vh;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: relative;
    overflow: hidden;
  }

  @media screen and (max-width: 1480px) {
    html, body, #root {
      font-size: 16px;
    }
  }
  
  @media screen and (max-width: 600px) {
    html, body, #root {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 400px) {
    html, body, #root {
      font-size: 13px;
    }
  }
`;

export const AppContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;

  @media screen and (max-width: 600px) {
    width: 85%;
  }
`;
