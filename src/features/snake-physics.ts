export type LoosePiece = {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  text: string;
  font: string;
  color: string;
  background?: string;
};

export function advancePieces(
  pieces: LoosePiece[],
  dt: number,
  width: number,
  floor: (piece: LoosePiece) => number,
) {
  const step = Math.min(dt, 1 / 30);
  for (const piece of pieces) {
    piece.vy += 700 * step;
    piece.x += piece.vx * step;
    piece.y += piece.vy * step;
    if (piece.x < 0 || piece.x + piece.width > width) {
      piece.x = Math.max(0, Math.min(width - piece.width, piece.x));
      piece.vx *= -0.35;
    }
    const support = floor(piece);
    if (piece.y + piece.height > support) {
      piece.y = support - piece.height;
      piece.vy = Math.abs(piece.vy) > 25 ? -piece.vy * 0.22 : 0;
      piece.vx *= 0.8;
    }
  }
  for (let i = 0; i < pieces.length; i++)
    for (let j = i + 1; j < pieces.length; j++) {
      const a = pieces[i],
        b = pieces[j];
      const overlapX =
        Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
      const overlapY =
        Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
      if (overlapX <= 0 || overlapY <= 0) continue;
      if (overlapY < overlapX) {
        const upper = a.y < b.y ? a : b;
        upper.y -= overlapY;
        upper.vy = Math.min(0, -upper.vy * 0.15);
        upper.vx *= 0.9;
      } else {
        const sign = a.x < b.x ? -1 : 1;
        a.x += (sign * overlapX) / 2;
        b.x -= (sign * overlapX) / 2;
        const velocity = a.vx;
        a.vx = b.vx * 0.4;
        b.vx = velocity * 0.4;
      }
    }
}
