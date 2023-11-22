export function coordsToCss(x, y) {
  return {
    gridColumn: `${x}/${x + 1}`,
    gridRow: `${y}/${y + 1}`,
  };
}