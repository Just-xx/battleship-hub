import Pattern from "./Pattern.js";

export const ROOM_STATE_LOBBY = "lobby";
export const ROOM_STATE_GAME = "game";
export const ROOM_STATE_ABONDED = "abonded";

export const ROOM_UTYPE_PLAYER = "player";
export const ROOM_UTYPE_HOST = "host";

export default class Room {
  id = null;
  hostId = null;
  playerId = null;
  players = [];
  freezed = false;
  patterns = [];
  turn = null;
  nicknames = {
    player: "",
    host: "",
  };
  state = ROOM_STATE_LOBBY;

  constructor(roomId, initSocketId) {
    this.id = roomId;
    this.hostId = initSocketId;
    this.players = [initSocketId];
    this.turn = Math.round(Math.random()) ? ROOM_UTYPE_PLAYER : ROOM_UTYPE_HOST;
  }

  addPattern(socketId, pattern) {
    this.patterns.push(
      new Pattern(socketId, this.getUserType(socketId), pattern)
    );
  }

  addPlayer(socketId) {
    this.playerId = socketId;
    this.players.push(socketId);
  }

  updatePlayerId(prevSocketId, socketId) {
    const i = this.players.indexOf(prevSocketId);
    this.players[i] = socketId;

    if (this.hostId === prevSocketId) this.hostId = socketId;
    if (this.playerId === prevSocketId) this.playerId = socketId;
  }

  getUserType(socketId) {
    return socketId === this.hostId ? ROOM_UTYPE_HOST : ROOM_UTYPE_PLAYER;
  }

  isPresent(socketId) {
    return this.players.indexOf(String(socketId)) + 1;
  }

  isComplete() {
    if (this.players.length === 2 && this.hostId && this.playerId) return true;
    return false;
  }

  setHostNickname(nickname) {
    this.nicknames.host = nickname;
  }

  setPlayerNickname(nickname) {
    this.nicknames.host = nickname;
  }

  freeze(unfreeze) {
    this.freezed = !unfreeze;
  }

  changeTurn() {
    this.turn =
      this.turn === ROOM_UTYPE_HOST ? ROOM_UTYPE_PLAYER : ROOM_UTYPE_HOST;
  }

  deletePlayer() {
    this.players = this.players.filter(id => id !== this.playerId);
    this.playerId = null;
  }

  getPatternById(socketId) {
    return this.patterns.find(pattern => pattern.ownerId === socketId);
  }

  addStruck(socketId, x, y) {
    return this.getPatternById(socketId).addStruck(x, y);
  }

  getOpponentId(socketId) {
    return this.players.find(id => id !== socketId);
  }

  setGameState() {
    this.state = ROOM_STATE_GAME;
  }

  checkForWin(socketId) {
    return this.getPatternById(socketId).isDone();
  }

  abond() {
    this.state = ROOM_STATE_ABONDED;
  }
}
