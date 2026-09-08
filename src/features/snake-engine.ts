export type Cell = { x: number; y: number };
export type Direction = "up" | "down" | "left" | "right";
export const vectors: Record<Direction, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
export const sameCell = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;
export function canTurn(current: Direction, next: Direction) {
  return (
    vectors[current].x + vectors[next].x !== 0 ||
    vectors[current].y + vectors[next].y !== 0
  );
}
export function step(
  body: Cell[],
  direction: Direction,
  food: Cell,
  columns: number,
  rows: number,
) {
  const vector = vectors[direction];
  const head = {
    x: (body[0].x + vector.x + columns) % columns,
    y: (body[0].y + vector.y + rows) % rows,
  };
  const ate = sameCell(head, food);
  const collision = (ate ? body : body.slice(0, -1)).some((cell) =>
    sameCell(cell, head),
  );
  return { body: [head, ...(ate ? body : body.slice(0, -1))], ate, collision };
}
