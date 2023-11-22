import { createContext, useReducer } from "react";

export const RoomContext = createContext();
export const RoomContextProvider = RoomContext.Provider;

export const ROOM_CONTEXT_DEFAULT = {
  roomId: null,
  hostId: null,
  id: null,
  hostNickname: null,
  playerNickname: null,
  freeze: false,
  connected: false,
  connectedToRoom: false,
  userType: "",
  pattern: [],
  turn: null,
  hits: [],
  oponnentHits: [],
  struckedShips: [],
  struckedOponnentShips: [],
};

export const useRoomReducer = () => {
  const reducer = (state, action) => {

    if (!state.freeze) {
      switch (action.type) {
        case "RESET":
          return ROOM_CONTEXT_DEFAULT;
        case "CONNECT":
          return { ...state, connected: true };
        case "CONNECT_TO_ROOM":
          return {
            ...state,
            connectedToRoom: true,
            connected: true,
            roomId: action.roomId,
          };
        case "SET_PLAYER_NICKNAME":
          return { ...state, playerNickname: action.playerNickname };
        case "SET_HOST_NICKNAME":
          return { ...state, hostNickname: action.hostNickname };
        case "SET_HOST_USERTYPE":
          return { ...state, userType: "host" };
        case "SET_PLAYER_USERTYPE":
          return { ...state, userType: "player" };
        case "PLAYER_QUIT":
          return { ...state, playerNickname: null };
        case "HOST_QUIT":
          return { ...state, hostNickname: null };
        case "FREEZE":
          return { ...state, freeze: true };
        case "SET_ID":
          return { ...state, id: action.id };
        case "ADD_OPONNENT_HIT":
          return {
            ...state,
            oponnentHits: [
              ...state.oponnentHits,
              {
                x: action.x,
                y: action.y,
                shipType: action.shipType,
                struck: action.struck,
              },
            ],
          };
        case "ADD_HIT":
          return {
            ...state,
            hits: [
              ...state.hits,
              {
                x: action.x,
                y: action.y,
                shipType: action.shipType,
                struck: action.struck,
              },
            ],
          };
        case "SET_TURN":
          return { ...state, turn: action.turn };
        case "ADD_STRUCK":
          return {...state, struckedShips: addStruck(state.struckedShips, action.id)};
        case "ADD_OPONNENT_STRUCK":
          return {...state, struckedOponnentShips: addStruck(state.struckedOponnentShips, action.id)};
      }
    }

    switch (action.type) {
      case "UNFREEZE":
        return { ...state, freeze: false };
      case "SET_PATTERN":
        return {
          ...state,
          pattern: action.pattern,
        };
      case "SET_STRUCKED_SHIPS":
        return {
          ...state,
          struckedShips: action.pattern.map(ship => ({
            id: ship.id,
            type: ship.type,
            strucks: 0,
          })),
        };
      case "SET_STRUCKED_OPONNENT_SHIPS":
        return {
          ...state,
          struckedOponnentShips: action.pattern.map(ship => ({
            id: ship.id,
            type: ship.type,
            strucks: 0,
          })),
        };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, ROOM_CONTEXT_DEFAULT);
  return [state, dispatch];
};

function addStruck(struckedShips, shipId) {

  const isStruckedShipId = struckedShips.findIndex(
    ship => ship.id === shipId
  );


  if (isStruckedShipId + 1) {
    const newStruckedShipsState = struckedShips.map((ship, index) => {
      if (index == isStruckedShipId) {
        return {
          ...ship,
          strucks: ship.strucks + 1,
        };
      }
      return ship;
    });

    return newStruckedShipsState;
  }

  throw Error("Ship id wasn't found " + shipId)
}
