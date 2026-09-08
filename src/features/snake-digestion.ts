import type { Cell } from "./snake-engine";

export function mealExpansion(
  items: readonly { width: number; height: number }[],
) {
  const area = items.reduce((sum, item) => sum + item.width * item.height, 0);
  const span = items.reduce(
    (largest, item) => Math.max(largest, item.height * 0.65, item.width * 0.45),
    0,
  );
  return Math.min(
    13,
    Math.max(0, (Math.max(Math.sqrt(area), span) - 22) * 0.3),
  );
}

export function swallow(meals: readonly number[], expansion: number) {
  return [0, expansion, ...meals.slice(1)];
}

function radius(index: number, meals: readonly number[]) {
  let extra = 0;
  for (
    let i = Math.max(1, Math.floor(index) - 2);
    i < Math.min(meals.length, Math.ceil(index) + 3);
    i++
  ) {
    extra = Math.max(
      extra,
      meals[i] * Math.exp(-Math.pow((index - i) / 0.82, 4)),
    );
  }
  return 9 + extra;
}

// The outline follows the same moving body coordinates, including separate runs at page wraps.
export function bodyOutline(
  points: readonly Cell[],
  meals: readonly number[],
  previous: readonly number[],
  blend: number,
  cellSize: number,
) {
  let path = "";
  const format = (point: Cell) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  for (let start = 0; start < points.length; ) {
    let end = start;
    while (
      end + 1 < points.length &&
      Math.hypot(
        points[end + 1].x - points[end].x,
        points[end + 1].y - points[end].y,
      ) <=
        cellSize * 2
    )
      end++;
    if (end === start) {
      start++;
      continue;
    }
    const samples: { point: Cell; radius: number }[] = [];
    for (let i = start; i < end; i++) {
      const p0 = points[Math.max(start, i - 1)],
        p1 = points[i],
        p2 = points[i + 1],
        p3 = points[Math.min(end, i + 2)];
      for (let n = 0; n < 8; n++) {
        const t = n / 8;
        const coordinate = (axis: "x" | "y") =>
          0.5 *
          (2 * p1[axis] +
            (-p0[axis] + p2[axis]) * t +
            (2 * p0[axis] - 5 * p1[axis] + 4 * p2[axis] - p3[axis]) * t * t +
            (-p0[axis] + 3 * p1[axis] - 3 * p2[axis] + p3[axis]) * t * t * t);
        samples.push({
          point: { x: coordinate("x"), y: coordinate("y") },
          radius:
            radius(i + t, previous) * (1 - blend) +
            radius(i + t, meals) * blend,
        });
      }
    }
    samples.push({
      point: points[end],
      radius: radius(end, previous) * (1 - blend) + radius(end, meals) * blend,
    });
    const left: Cell[] = [],
      right: Cell[] = [];
    samples.forEach((sample, i) => {
      const before = samples[Math.max(0, i - 1)].point,
        after = samples[Math.min(samples.length - 1, i + 1)].point;
      const length = Math.hypot(after.x - before.x, after.y - before.y) || 1;
      const nx = (-(after.y - before.y) / length) * sample.radius,
        ny = ((after.x - before.x) / length) * sample.radius;
      left.push({ x: sample.point.x + nx, y: sample.point.y + ny });
      right.push({ x: sample.point.x - nx, y: sample.point.y - ny });
    });
    const tail = samples.at(-1)!.radius,
      head = samples[0].radius;
    path += `M${format(left[0])}${left
      .slice(1)
      .map((point) => `L${format(point)}`)
      .join("")}A${tail},${tail} 0 0 0 ${format(right.at(-1)!)}${right
      .slice(0, -1)
      .reverse()
      .map((point) => `L${format(point)}`)
      .join("")}A${head},${head} 0 0 0 ${format(left[0])}Z`;
    start = end + 1;
  }
  return path;
}
