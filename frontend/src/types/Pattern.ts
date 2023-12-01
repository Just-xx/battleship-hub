export type Ship = {
  id: string,
  type: string,
  strucks: number,
  rowStart?: number,
  rowEnd?: number,
  columnStart?: number,
  columnEnd?: number
}

export type Pattern = Ship[];