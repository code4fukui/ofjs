import { Vector2 } from "./Vector2.js";

export const vec3 = (x, y, z) => {
  return { x, y, z };
};

export const vec2 = (x, y) => {
  return new Vector2(x, y);
};
