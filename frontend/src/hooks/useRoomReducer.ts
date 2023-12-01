import { RoomState, ROOM_CONTEXT_DEFAULT } from "../types/RoomState";
import { RoomAction } from "../types/RoomAction";
import { useReducer } from "react";

const reducer = (
  state: RoomState,
  { type, payload: p }: RoomAction
): RoomState => {
  switch (type) {
    case "RESET":
      if (!state.freeze) return ROOM_CONTEXT_DEFAULT;
      return state;

    case "CONNECT":
      return { ...state, connected: true };

    case "CONNECT_TO_ROOM":
      return {
        ...state,
        connectedToRoom: true,
        connected: true,
        roomId: p.roomId,
      };

    case "SET_PLAYER_NICKNAME":
      return { ...state, playerNickname: p.playerNickname };

    case "SET_HOST_NICKNAME":
      return { ...state, hostNickname: p.hostNickname };

    case "SET_HOST_USERTYPE":
      return { ...state, userType: "host" };

    case "SET_PLAYER_USERTYPE":
      return { ...state, userType: "player" };

    case "PLAYER_QUIT":
      return { ...state, playerNickname: undefined };

    case "HOST_QUIT":
      return { ...state, hostNickname: undefined };

    case "FREEZE":
      return { ...state, freeze: true };

    case "UNFREEZE":
      return { ...state, freeze: false };

    case "SET_ID":
      return { ...state, id: p.id };

    case "ADD_O_HIT":
      let newOpponentPattern = state.patterns?.opponent;
      if (p.struck && newOpponentPattern) {
        const shipI: number = newOpponentPattern?.findIndex(
          ship => ship.id === p.shipId
        );
        newOpponentPattern[shipI].strucks++;
      }

      return {
        ...state,
        patterns: {
          ...state.patterns,
          opponent: newOpponentPattern,
        },
        hits: {
          ...state.hits,
          opponent: [
            ...(state?.hits?.opponent || []),
            {
              x: p.x,
              y: p.y,
              type: p.shipType,
              struck: p.struck,
            },
          ],
        },
      };

    case "ADD_HIT":
      let newOwnPattern = state.patterns?.own;
      if (p.struck && newOwnPattern) {
        const shipI: number = newOwnPattern?.findIndex(
          ship => ship.id === p.shipId
        );
        console.log(newOwnPattern, p.shipId);
        newOwnPattern[shipI].strucks++;
      }

      return {
        ...state,
        patterns: {
          ...state.patterns,
          own: newOwnPattern,
        },
        hits: {
          ...state.hits,
          own: [
            ...(state?.hits?.own || []),
            {
              x: p.x,
              y: p.y,
              type: p.shipType,
              struck: p.struck,
            },
          ],
        },
      };

    case "SET_TURN":
      return { ...state, turn: p.turn };

    case "SET_O_PATTERN":
      const readyOPattern = p.pattern?.map(ship => ({ ...ship, strucks: 0 }));

      return {
        ...state,
        patterns: {
          ...state.patterns,
          opponent: readyOPattern,
        },
      };

    case "SET_PATTERN":
      const readyPattern = p.pattern?.map(ship => ({ ...ship, strucks: 0 }));

      return {
        ...state,
        patterns: {
          ...state.patterns,
          own: readyPattern,
        },
      };
    default:
      throw new Error(`action ${type} deosn't exist`);
  }
};

export const useRoomReducer = () => {
  const [state, dispatch] = useReducer(reducer, ROOM_CONTEXT_DEFAULT);
  return { roomState: state, dispatchRoom: dispatch };
};
