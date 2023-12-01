import chalk from "chalk";
import { Rooms } from "../utils/Rooms.js";
import { makeId } from "../utils/makeId.js";

class RoomController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.makeId = makeId;

    this.#roomHandlersSet();
  }

  #handleCreatingRoom() {
    this.socket.on("createRoomReq", () => {
      const roomId = this.makeId(12);
      Rooms.create(roomId, this.socket.id);

      this.socket.join(roomId);
      this.#sendRoomIdProposal(roomId);
    });
  }

  #sendRoomIdProposal(roomId) {
    this.socket.emit("roomIdProposal", {
      roomId: String(roomId),
      success: true,
      socketId: this.socket.id,
    });
  }

  #handleJoiningRoom() {
    this.socket.on("joinRoom", payload => {
      if (Rooms.getById(payload.roomId)) {

        this.socket.join(String(payload.roomId));
        Rooms.addUser(payload.roomId, this.socket.id);
        this.#sendRoomIdProposal(payload.roomId)

        this.socket.to(payload.roomId).emit("playerJoin", {
          id: this.socket.id,
          playerNickname: payload.playerNickname,
        });

      } else {
        this.socket.emit("roomIdProposal", {
          success: false,
          roomId: undefined,
        });
      }
    });
  }

  #handleGamePreparation() {
    this.socket.on("requestStart", payload => {
      this.io.to(payload.roomId).emit("requestData");
    });

    this.socket.on("gameData", payload => {
      if (payload.hostNickname) {
        Rooms.addHostNickname(payload.roomId, payload.hostNickname);
        this.io
          .to(payload.roomId)
          .emit("hostInfo", { hostNickname: payload.hostNickname });
      } else if (payload.playerNickname)
        Rooms.addPlayerNickname(payload.roomId, payload.playerNickname);

      if (Rooms.isLobbyComplete(payload.roomId)) {
        this.#handleGameStart(payload);
      }
    });
  }

  #handleGameStart(payload) {
    console.log(chalk.green(`Game room "${payload.roomId}" starting game...`));
    Rooms.freeze(payload.roomId, false);
    Rooms.setGameState(payload.roomId);
    this.io.to(payload.roomId).emit("gameStart");
  }

  #handleDisconnect() {
    this.socket.on("disconnect", () => {
      const socketId = this.socket.id;

      const room = Rooms.getBySocketId(socketId);
      const isHost = room?.hostId === socketId;

      if (!room) {
        return;
      }

      if (room.freezed) {
        return;
      }

      if (isHost) {
        Rooms.deleteRoom(room.id);
        this.socket.to(room.id).emit("hostQuit");
      } else {
        room.deletePlayer();
        this.socket.to(room.id).emit("playerQuit");
      }
    });
  }

  #roomHandlersSet() {
    this.#handleCreatingRoom();
    this.#handleJoiningRoom();
    this.#handleGamePreparation();
    this.#handleDisconnect();
  }
}

export function roomController(io) {
  io.on("connection", socket => {
    new RoomController(io, socket);
  });
}
