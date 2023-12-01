import { Context, createContext, useReducer } from "react";
import { ROOM_CONTEXT_DEFAULT } from "../types/RoomState";

export const RoomContext = createContext({roomState: ROOM_CONTEXT_DEFAULT, dispatchRoom: undefined});
export const RoomContextProvider = RoomContext.Provider;