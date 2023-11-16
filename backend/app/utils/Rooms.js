import chalk from "chalk";

export class Rooms {
  static rooms = [];

  static logRooms() {
    if (this.rooms.length > 0) {
      console.log("---------ROOMS---------");
      this.rooms.forEach((room, i) => {
        console.log(
          `ROOM ${chalk.green(i)}: ${chalk.yellow(
            room.id
          )} USERS(${chalk.yellow(room.users.length)}): ${chalk.yellow(
            room.users.join(", ")
          )}`
        );
        console.log(
          `PLAYERNICK: ${chalk.yellow(
            room.playerNickname
          )} HOSTNICK: ${chalk.yellow(room.hostNickname)}`
        );
      });
      console.log("-----------------------");
    } else {
      console.log("-------------");
      console.log("NO ROOMS");
      console.log("-------------");
    }
  }

  static create(newRoomId, userId) {
    this.rooms = [
      ...this.rooms,
      { id: newRoomId, users: [userId], hostId: userId },
    ];
  }

  static addUser(roomId, userId) {
    this.rooms = this.rooms.map((room, i) => {
      if (String(room.id) === String(roomId)) {
        return { ...room, users: [...room.users, userId] };
      } else return room;
    });
  }

  static addHostNickname(roomId, nickname) {
    this.rooms = this.rooms.map((room, i) => {
      if (String(room.id) === String(roomId)) {
        return { ...room, hostNickname: nickname };
      } else return room;
    });
  }

  static addPlayerNickname(roomId, nickname) {
    this.rooms = this.rooms.map((room, i) => {
      if (String(room.id) === String(roomId)) {
        return { ...room, playerNickname: nickname };
      } else return room;
    });
  }

  static getById(roomId) {
    return this.rooms[this.rooms.findIndex(room => room.id === roomId)];
  }

  static isLobbyComplete(roomId) {
    if (
      this.getById(roomId).users.length === 2 &&
      this.getById(roomId).hostNickname &&
      this.getById(roomId).playerNickname
    )
      return true;
    else return false;
  }

  static handleQuit(io, socket, hostDisconnects, playerDisconnects) {
    const socketId = socket.id;
    let playerSocketId;

    const roomIndexByHost = this.rooms.findIndex(
      room => room.hostId === socketId
    );

    const roomIndexByPlayer = this.rooms.findIndex(
      room =>
        room.users.findIndex(
          user => user === socketId && user !== room.hostId
        ) > 0
    );

    if (roomIndexByHost + 1 && !this.rooms[roomIndexByHost].freeze) {
      this.rooms.forEach(room => {
        if (String(room.hostId) === String(socketId)) {
          playerSocketId =
            room.users[room.users.findIndex(user => user !== room.hostId)];
        }
      });

      this.rooms = this.rooms.filter((room, i) => i !== roomIndexByHost);

      hostDisconnects(io, playerSocketId);
      console.log(
        chalk.red(
          `Host "${socketId}" disconnected and room ${roomIndexByHost} was deleted`
        )
      );
    } else if (roomIndexByPlayer + 1 && !this.rooms[roomIndexByPlayer].freeze) {
      this.rooms = this.rooms.map((room, i) => {
        const cleanedUsers = room.users.filter(userId => userId !== socketId);
        return { ...room, users: cleanedUsers };
      });

      playerDisconnects(io, this.rooms[roomIndexByPlayer].id);
      console.log(
        chalk.red(
          `Player "${socketId}" disconnects from room ${roomIndexByPlayer}`
        )
      );
    } else if (
      (roomIndexByHost + 1 || roomIndexByPlayer + 1) &&
      (this.rooms[roomIndexByHost]?.freeze ||
        this.rooms[roomIndexByPlayer]?.freeze)
    ) {
      console.log(
        chalk.yellow(
          "User disconnected from websocket, but room is frezzed, that means game is starting"
        )
      );
    } else {
      console.log(chalk.red(`Player "${socketId}" without room disconnected`));
    }
  }

  static freeze(roomId, unfreeze) {
    const doUnfrezze = unfreeze ? false : true;
    const fRoom = this.getById(String(roomId));

    this.rooms = this.rooms.map(room => {
      if (fRoom.id === room.id) {
        return { ...room, freeze: doUnfrezze };
      } else return room;
    });
  }

  static updateUser(roomId, userType, socketId) {

    const replaceUser = room => {
      return room.users.map(userId => userId === socketId ? socketId : userId)
    }

    this.rooms = this.rooms.map(room => {
      if (userType === 'host' && room.roomId === roomId) {
        return {...room, hostId: socketId, users: replaceUser(room)}
      }
      else if (room.roomId === roomId) {
        return {...room, users: replaceUser(room)}
      }
      else return room;
    })
  }
}
