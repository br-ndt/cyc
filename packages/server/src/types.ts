interface ITransform {
  position: number[];
  rotation: number[];
}

export interface IWorldState {
  cubeState: {
    delta: number;
    transform: ITransform;
  };
}

export interface IWorld {
  getState: () => IWorldState;
  setState: (newState: IWorldState) => void;
  state: IWorldState;
}
