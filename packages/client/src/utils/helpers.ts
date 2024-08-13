import { Quad, Triplet } from "@react-three/cannon";

export function createTriplet(vec3: {
  x: number;
  y: number;
  z: number;
}): Triplet {
  return [vec3.x, vec3.y, vec3.z];
}

export function createQuad(quat: {
  x: number;
  y: number;
  z: number;
  w: number;
}): Quad {
  return [quat.x, quat.y, quat.z, quat.w];
}
