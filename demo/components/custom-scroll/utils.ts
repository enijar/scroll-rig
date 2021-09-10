import { Element } from "./custom-scroll";

export function toWorld(
  size: {
    width: number;
    height: number;
  },
  element: Element & { z?: number }
): [x: number, y: number, z: number] {
  const { x, y, z = 0, width, height } = element;
  const cx = size.width / 2;
  const cy = size.height / 2;
  return [-cx + width / 2 + x, cy - height / 2 - y, z];
}
