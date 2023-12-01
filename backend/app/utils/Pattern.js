export default class Pattern {
  ownerId = null;
  userType = null;
  pattern = null;
  strucksCoords = [];

  constructor(socketId, userType, pattern) {
    this.ownerId = socketId;
    this.userType = userType;
    this.pattern = pattern.map(ship => ({ ...ship, sank: false, strucks: 0 }));
  }

  // returns true, when struck is registered
  // returs false, when struck is not possible
  addStruck(x, y) {
    let struckedShip = null;

    this.strucksCoords.forEach(coord => {
      if (coord.x === x && coord.y === y) {
        return struckedShip;
      }
    });

    this.pattern.forEach((ship, i) => {
      for (let shipX = ship.columnStart; shipX <= ship.columnEnd; shipX++) {
        for (let shipY = ship.rowStart; shipY <= ship.rowEnd; shipY++) {
          if (x === shipX && y === shipY) {
            struckedShip = ship;
            this.strucksCoords.push({
              x,
              y,
              shipType: ship.type,
              struck: true,
            });
            this.pattern[i].strucks++;
            if (ship.strucks === ship.length) this.pattern[i].sank = true;
          }
        }
      }
    });

    return struckedShip;
  }

  isDone() {
    console.log(this.pattern)
    return this.pattern.filter(ship => !ship.sank).length === 0;
  }
}
