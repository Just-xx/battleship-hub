import chalk from "chalk";
import Room from "./Room.js";

export class Rooms {
  static oldRooms = [];
  static rooms = [];

  static create(newRoomId, userId) {
    this.rooms.push(new Room(newRoomId, userId));
  }

  static addUser(roomId, userId) {
    this.getById(roomId).addPlayer(userId);
  }

  static addHostNickname(roomId, nickname) {
    this.getById(roomId).setHostNickname(nickname);
  }

  static addPlayerNickname(roomId, nickname) {
    this.getById(roomId).setPlayerNickname(nickname);
  }

  static getById(roomId) {
    return this.rooms.find(room => room.id === roomId);
  }

  static getBySocketId(socketId) {
    return this.rooms.find(room => room.isPresent(socketId));
  }

  static isLobbyComplete(roomId) {
    return this.getById(roomId).isComplete();
  }

  static deleteRoom(roomId) {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
  }

  static freeze(roomId, unfreeze) {
    this.getById(roomId).freeze(unfreeze);
  }

  static updateUser(roomId, socketId, prevSocketId) {
    this.getById(roomId).updatePlayerId(prevSocketId, socketId);
  }

  static addPattern(roomId, socketId, pattern) {
    this.getById(roomId).addPattern(socketId, pattern);
  }

  static changeTurn(roomId) {
    this.getById(roomId).changeTurn();
  }

  static getTurn(roomId) {
    return this.getById(roomId).turn;
  }

  static addHit(roomId, socketId, x, y) {
    return this.getById(roomId).addStruck(this.getOpponentId(socketId), x, y);
  }

  static checkForWin(socketId) {
    return this.getBySocketId(this.getOpponentId(socketId)).checkForWin(
      this.getOpponentId(socketId)
    );
  }

  static getOpponentId(socketId) {
    const oponnentSocket = this.getBySocketId(socketId).getOpponentId(socketId);
    return oponnentSocket;
  }

  static getOpponentPattern(socketId) {
    // TODO: BUG
    console.log("AAA", this.getBySocketId(socketId))
    return this.getBySocketId(socketId).getPatternById(
      this.getOpponentId(socketId)
    );
  }

  static setGameState(roomId) {
    this.getById(roomId).setGameState();
  }
}
