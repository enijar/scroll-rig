export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function map(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}


export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
