import { Pattern } from "./Pattern";

export type RoomActionTypes =
  | "RESET"
  | "CONNECT"
  | "CONNECT_TO_ROOM"
  | "SET_PLAYER_NICKNAME"
  | "SET_HOST_NICKNAME"
  | "SET_PLAYER_USERTYPE"
  | "SET_HOST_USERTYPE"
  | "PLAYER_QUIT"
  | "HOST_QUIT"
  | "FREEZE"
  | "SET_ID"
  | "SET_TURN"
  | "UNFREEZE"
  | "SET_PATTERN"
  | "ADD_HIT"
  | "ADD_O_HIT" // _O_ - opponent
  | "SET_PATTERN"
  | "SET_O_PATTERN";

export type RoomActionPayload = {
  hostNickname?: string,
  playerNickname?: string,
  userType?: string,
  freeze?: boolean,
  id?: string,
  roomId?: string
  x?: number,
  y?: number,
  shipType?: string,
  struck?: boolean
  turn?: string,
  shipId?: string,
  pattern?: Pattern
}

export type RoomAction = {
  type: RoomActionTypes,
  payload: RoomActionPayload
}