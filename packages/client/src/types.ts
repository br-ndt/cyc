interface ITransform {
  position: number[];
  rotation: number[];
}

export interface IWorldState {
  cubeState: {
    isHovered: boolean;
    transform: ITransform;
  };
}
