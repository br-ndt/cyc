interface ITransform {
  position: number[];
  rotation: number[];
}

export interface IWorldState {
  delta: number;
  cube: {
    isHovered: boolean;
    transform: ITransform;
  };
}

export interface Triplet {
  x: number;
  y: number;
  z: number;
}

export interface Quad {
  w: number;
  x: number;
  y: number;
  z: number;
}
