import chalk from "chalk";

export class Rooms {
  static rooms = [];

  static updateRoom(roomId, newRoomState) {
    this.rooms = this.rooms.map(room =>
      room.id === roomId ? newRoomState : room
    );
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
    return this.rooms.find(room => room.users.indexOf(socketId) + 1);
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

    if (
      (roomIndexByHost + 1 || roomIndexByPlayer + 1) &&
      (this.rooms[roomIndexByHost]?.freeze ||
        this.rooms[roomIndexByPlayer]?.freeze)
    ) {
      return console.log(
        chalk.yellow(
          `User "${socketId}" disconnected from websocket, but room is frezzed, that means game is starting`
        )
      );
    }

    if (roomIndexByHost + 1) {
      hostDisconnects(socket, this.rooms[roomIndexByHost].id);
      this.rooms = this.rooms.filter((room, i) => i !== roomIndexByHost);

      console.log(
        chalk.red(
          `Host "${socketId}" disconnected and room ${roomIndexByHost} was deleted`
        )
      );
    } else if (roomIndexByPlayer + 1) {
      this.rooms = this.rooms.map(room => {
        const cleanedUsers = room.users.filter(userId => userId !== socketId);
        return { ...room, users: cleanedUsers };
      });

      playerDisconnects(socket, this.rooms[roomIndexByPlayer].id);
      console.log(
        chalk.red(
          `Player "${socketId}" disconnects from room ${roomIndexByPlayer}`
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

    console.log("PREV: " + prevSocketId)
    
    const replaceUser = (room, comperison) => {
      return room.users.map(userId => {
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

    newRoomState = { ...newRoomState, patterns: newRoomState?.patterns || [] };
    newRoomState.patterns = [
      ...newRoomState.patterns,
      {
        id: socketId,
        pattern,
        userType,
      },
    ];

    this.updateRoom(roomId, newRoomState);
  }

  static changeTurn(roomId) {
    const room = this.getById(roomId);
    this.updateRoom(roomId, {
      ...room,
      turn: room.turn === "player" ? "host" : "player",
    });
  }

  static setRandomTurn(roomId) {
    const rand = Math.round(Math.random());
    this.updateRoom(roomId, {
      ...this.getById(roomId),
      turn: rand ? "player" : "host",
    });
  }

  static getTurn(roomId) {
    return this.getById(roomId)?.turn;
  }

  static addHit(roomId, socketId, x, y, ship) {
    let room = this.getBySocketId(socketId);
    const userType = socketId === room.hostId ? "host" : "player";

    if (!room.hits) {
      room = {
        ...room,
        hits: [
          {
            userType,
            socketId: socketId,
            shipId: ship.id,
            shipType: ship.type,
            coords: [{ x, y }],
          },
        ],
      };
    } else {
      const roomHitsIndex = room.hits.findIndex(hit => hit.shipId === ship.id);

      if (roomHitsIndex + 1) {
        room.hits[roomHitsIndex] = {
          ...room.hits[roomHitsIndex],
          coords: [...room.hits[roomHitsIndex].coords, { x, y }],
        };
      } else {
        room.hits = [
          ...room.hits,
          {
            userType,
            socketId: socketId,
            shipId: ship.id,
            shipType: ship.type,
            coords: [{ x, y }],
          },
        ];
      }
    }

    this.updateRoom(roomId, room);
  }

  static checkForHit(roomId, socketId, x, y) {
    const room = this.getBySocketId(socketId);
    const patternData = room.patterns.find(pattern => pattern.id !== socketId);
    let hittedShip = false;

    patternData.pattern.forEach(ship => {
      for (let shipX = ship.columnStart; shipX <= ship.columnEnd; shipX++) {
        for (let shipY = ship.rowStart; shipY <= ship.rowEnd; shipY++) {
          if (x === shipX && y === shipY) {
            hittedShip = { hit: true, ship };

            if (this.getById(roomId)?.hits) {
              this.getById(roomId).hits.forEach(hit => {
                if (hit.socketId !== socketId && hit.shipId === ship.id) {
                  hit.coords.forEach(coord => {
                    if (coord.x === x && coord.y === y) {
                      hittedShip = { hit: false, alreadyHitted: true };
                    }
                  });
                }
              });
            }
          }
        }
      }
    });

    if (hittedShip?.hit) {
      this.addHit(roomId, this.getOponnentId(socketId), x, y, hittedShip.ship);
    }

    return hittedShip;
  }

  static checkForWin(roomId, socketId) {
    if (this.getById(roomId)?.hits) {
      const hits = this.getById(roomId).hits.filter(
        hit => hit.socketId !== socketId
      );

      const shipsCoords = this.getOpoenntPattern(socketId).map(ship => {
        let shipCoords = [];
        for (let shipX = ship.columnStart; shipX <= ship.columnEnd; shipX++) {
          for (let shipY = ship.rowStart; shipY <= ship.rowEnd; shipY++) {
            shipCoords.push({ x: shipX, y: shipY });
          }
        }
        return shipCoords;
      }).flat();


      const checkTable = shipsCoords.map(shipCoord => {
        let checked = false;
        hits.forEach(hit => {
          hit.coords.forEach(coord => {
            if (coord.x === shipCoord.x && coord.y === shipCoord.y) {
              checked = true;
            }
          })
        });
        return checked;
      });


      if (checkTable.filter(check => !check).length === 0) {
        return true;
      }
      return false;
    }
  }

  static getOponnentId(socketId) {
    if (!this.getBySocketId(socketId)) {
      console.log(socketId);
      throw new Error("Room wasn't found")
    }
    const oponnentSocket = this.getBySocketId(socketId).users.find(
      userId => userId !== socketId
    );
    return oponnentSocket;
  }

  static getOpoenntPattern(socketId) {
    const oponnentSocket = this.getOponnentId(socketId);
    const oponnentPatern = this.getBySocketId(socketId).patterns.find(
      pattern => pattern.id === oponnentSocket
    );
    return oponnentPatern.pattern;
  }
}
