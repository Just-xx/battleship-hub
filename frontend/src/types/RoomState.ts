import { Pattern } from "./Pattern";
import { Hits } from "./Hits";

export const ROOM_CONTEXT_DEFAULT: RoomState = {
  roomId: '',
  id: '',
  hostNickname: '',
  playerNickname: '',
  userType: '',
  turn: '',
  freeze: false,
  connected: false,
  connectedToRoom: false,
  patterns: {
    own: [],
    opponent: []
  },
  hits: {
    own: [],
    opponent: []
  },
};

export type RoomState = {
  roomId?: string,
  id?: string,
  hostNickname?: string,
  playerNickname?: string,
  freeze?: boolean,
  connected?: boolean,
  connectedToRoom?: boolean,
  userType?: string,
  turn?: string,
  patterns?: {
    own?: Pattern,
    opponent?: Pattern
  },
  hits?: {
    own?: Hits,
    opponent?: Hits,
  }
}