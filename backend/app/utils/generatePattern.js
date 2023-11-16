const SHIPS_DATA = [
  {
    type: "small",
    quantity: 4,
    length: 1,
  },
  {
    type: "regular",
    quantity: 3,
    length: 2,
  },
  {
    type: "medium",
    quantity: 2,
    length: 3,
  },
  {
    type: "big",
    quantity: 1,
    length: 4,
  },
];

const conflictCheck = (generatedShip, shipsCluster) => {
  let conflict = false;

  if (shipsCluster.length === 0) return conflict;

  shipsCluster.forEach(item => {
    // loop over every ship in cluster coordinates
    for (let cellY = item.rowStart; cellY <= item.rowEnd; cellY++) {
      for (let cellX = item.columnStart; cellX <= item.columnEnd; cellX++) {
        // loop over generated ship coordinates
        for (
          let shipX = generatedShip.columnStart;
          shipX <= generatedShip.columnEnd;
          shipX++
        ) {
          for (
            let shipY = generatedShip.rowStart;
            shipY <= generatedShip.rowEnd;
            shipY++
          ) {
            // check for direct conflicts
            if (shipX === cellX && shipY === cellY) {
              conflict = true;
              break;
            }
            // check for indirect (around cell) conflicts
            else if (
              (shipX === cellX + 1 && shipY === cellY) ||
              (shipX === cellX - 1 && shipY === cellY) ||
              (shipX === cellX && shipY === cellY + 1) ||
              (shipX === cellX && shipY === cellY - 1) ||
              (shipX === cellX - 1 && shipY === cellY - 1) ||
              (shipX === cellX + 1 && shipY === cellY + 1) ||
              (shipX === cellX + 1 && shipY === cellY - 1) ||
              (shipX === cellX - 1 && shipY === cellY + 1)
            ) {
              conflict = true;
              break;
            }
          }
        }
      }
    }
  });

  return conflict;
};

const generateRandomShip = (ship, shipsCluster) => {
  let rowStart, rowEnd, columnStart, columnEnd;
  let direction = Math.round(Math.random()); // 0 or 1; 1 = vertical, 0 = horizontal

  if (direction === 0) {
    rowStart = Math.round(Math.random() * (10 - 1) + 1);
    rowEnd = rowStart;

    columnStart = Math.round(Math.random() * (10 - (ship.length - 1) - 1) + 1);
    columnEnd = columnStart + (ship.length - 1);
  }

  if (direction === 1) {
    columnStart = Math.round(Math.random() * (10 - 1) + 1);
    columnEnd = columnStart;

    rowStart = Math.round(Math.random() * (10 - (ship.length - 1) - 1) + 1);
    rowEnd = rowStart + (ship.length - 1);
  }

  return {
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
    direction,
  };
};

export const generatePattern = () => {
  let shipsCluster = [];

  SHIPS_DATA.forEach((ship, index) => {
    for (let i = 0; i < ship.quantity; i++) {
      let generatedShip = generateRandomShip(ship, shipsCluster);

      while (conflictCheck(generatedShip, shipsCluster)) {
        generatedShip = generateRandomShip(ship, shipsCluster);
      }

      shipsCluster = [
        ...shipsCluster,
        {
          type: ship.type,
          rowStart: generatedShip.rowStart,
          rowEnd: generatedShip.rowEnd,
          columnStart: generatedShip.columnStart,
          columnEnd: generatedShip.columnEnd,
          direction: generatedShip.direction,
        },
      ];
    }
  });

  return shipsCluster;
};
