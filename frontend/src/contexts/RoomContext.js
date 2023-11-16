import { createContext, useReducer } from "react";

export const RoomContext = createContext();
export const RoomContextProvider = RoomContext.Provider;

export const ROOM_CONTEXT_DEFAULT = {
  roomId: null,
  hostId: null,
  playerId: null,
  hostNickname: null,
  playerNickname: null,
  freeze: false,
  connected: false,
  connectedToRoom: false,
  userType: ''
}


export const useRoomReducer = () => {


  const reducer = (state, action) => {

    if (state.freeze && action.type !== "UNFREEZE") {
      return state;
    }

    switch(action.type) {
      case "RESET": return ROOM_CONTEXT_DEFAULT;
      case "CONNECT": return {...state, connected: true};
      case "CONNECT_TO_ROOM": return {...state, connectedToRoom: true, connected: true, roomId: action.roomId };
      case "SET_PLAYER_NICKNAME":  return {...state, playerNickname: action.playerNickname};
      case "SET_HOST_NICKNAME":  return {...state, hostNickname: action.hostNickname};
      case "SET_HOST_USERTYPE": return {...state, userType: 'host'};
      case "SET_PLAYER_USERTYPE": return {...state, userType: 'player'};
      case "PLAYER_QUIT": return {...state, playerNickname: null};
      case "HOST_QUIT": return {...state, hostNickname: null};
      case "FREEZE": return {...state, freeze: true};
      case "UNFREEZE": return {...state, freeze: false};
    }
    throw Error("No dispatch action like this " + action.type)
  }

  const [state, dispatch] = useReducer(reducer, ROOM_CONTEXT_DEFAULT)
  return [state, dispatch];
}