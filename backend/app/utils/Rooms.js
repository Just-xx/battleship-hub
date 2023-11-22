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

  static updateRoom(roomId, newRoomState) {
    this.rooms = this.rooms.map(room => room.id === roomId ? newRoomState : room)
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

  static getBySocketId(socketId) {
    return this.rooms.find(room => room.users.indexOf(socketId) + 1)
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

    const roomIndexByHost = this.rooms.findIndex(
      room => room.hostId === socketId
    );

    const roomIndexByPlayer = this.rooms.findIndex(
      room =>
        room.users.findIndex(
          user => user === socketId && user !== room.hostId
        ) > 0
    );

    if (roomIndexByHost + 1 && !this.rooms[roomIndexByHost]?.freeze) {
      hostDisconnects(socket, this.rooms[roomIndexByHost].id);
      this.rooms = this.rooms.filter((room, i) => i !== roomIndexByHost);

      console.log(
        chalk.red(
          `Host "${socketId}" disconnected and room ${roomIndexByHost} was deleted`
        )
      );
    } else if (
      roomIndexByPlayer + 1 &&
      !this.rooms[roomIndexByPlayer]?.freeze
    ) {
      this.rooms = this.rooms.map((room, i) => {
        const cleanedUsers = room.users.filter(userId => userId !== socketId);
        return { ...room, users: cleanedUsers };
      });

      playerDisconnects(socket, this.rooms[roomIndexByPlayer].id);
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

  static updateUser(roomId, userType, socketId, prevSocketId) {
    const replaceUser = (room, comperison) => {
      return room.users.map(userId => {
        console.log(userId, socketId);
        if (userId === comperison) {
          return socketId;
        } else {
          return userId;
        }
      });
    };

    this.rooms = this.rooms.map(room => {
      if (userType === "host" && room.id === roomId) {
        return {
          ...room,
          hostId: socketId,
          users: replaceUser(room, prevSocketId),
        };
      } else if (userType === "player" && room.id === roomId) {
        return { ...room, users: replaceUser(room, prevSocketId) };
      } else {
        return room;
      }
    });
  }

  static addPattern(roomId, socketId, userType, pattern) {
    let newRoomState = this.getById(roomId);

    newRoomState = {...newRoomState, patterns: newRoomState?.patterns || []};
    newRoomState.patterns = [...newRoomState.patterns, {
      id: socketId,
      pattern,
      userType
    }]

    this.updateRoom(roomId, newRoomState)
  }

  static changeTurn(roomId) {
    const room = this.getById(roomId);
    this.updateRoom(roomId, {...room, turn: room.turn === "player" ? "host" : "player"});
  }

  static setRandomTurn(roomId) {
    const rand = Math.round(Math.random());
    this.updateRoom(roomId, {...this.getById(roomId), turn: rand ? "player" : "host"})
  }

  static getTurn(roomId) {
    return this.getById(roomId)?.turn;
  }

  static addHit(roomId, socketId, x, y, ship) {

    
    let room = this.getBySocketId(socketId)
    const userType = socketId === room.hostId ? "host" : "player";

    // B u g    h e r e
    if (!room.hits) {
      room = {...room, hits: [{
        userType,
        socketId: socketId,
        shipId: ship.id,
        coords: [{ x, y, shipType: ship.type }]
      }]}
    }
    else {
      const roomHitsIndex = room.hits.findIndex(hit => hit.id === socketId);

      if (roomHitsIndex + 1) {
        const newHits = room.hits.map((hit, i) => {
          if (i === roomHitsIndex) {
            return hit
          }
        })
      }
      else {
        room = {...room, hits: [...room.hits, {
          userType,
          id: socketId,
          coords: [{ x, y, shipType: ship.type }]
        }]}
      }
    }


    console.log(this.rooms);
    this.updateRoom(roomId, room);
  }

  static checkForHit(roomId, socketId, x, y) {
    const room = this.getBySocketId(socketId)
    const patternData = room.patterns.find(pattern => pattern.id !== socketId);
    let hittedShip = false;

    patternData.pattern.forEach(ship => {
      for (let shipX = ship.columnStart; shipX <= ship.columnEnd; shipX++) {
        for (let shipY = ship.rowStart; shipY <= ship.rowEnd; shipY++) {
          if (x === shipX && y === shipY) {
            hittedShip = { hit: true, ship };
            this.addHit(roomId, socketId, x, y, ship)
          }
        }
      }
    })
    
    return hittedShip;
  }

  static getOponentId(socketId) {
    const oponnentSocket = this.getBySocketId(socketId).users.find(userId => userId !== socketId);
    return oponnentSocket;
  }

  static getOpoenntPattern(socketId) {
    const oponnentSocket = this.getOponentId(socketId);
    const oponnentPatern = this.getBySocketId(socketId).patterns.find(pattern => pattern.id === oponnentSocket);
    return oponnentPatern.pattern;
  }
}
