import { ThemeProvider } from "styled-components";
import Router from "./Router";
import ShipsBG from "./components/ShipsBG/ShipsBG";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle, AppContainer } from "./App.styles";
import { RoomContextProvider, useRoomReducer } from "./contexts/RoomContext";

const queryClient = new QueryClient();

const theme = {
  primary: "#4E2B25",
};

function App() {

  const [roomState, dispatchRoom] = useRoomReducer();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RoomContextProvider value={[roomState, dispatchRoom]}>
          <AppContainer>
              <Router />
          </AppContainer>
        </RoomContextProvider>
        <ShipsBG />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
