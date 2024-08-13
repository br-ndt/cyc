import { World } from "cannon-es";

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

export interface IWorldData {
  physics: World;
  state: IWorldState;
  timestamp: number;
  getState: () => IWorldState;
  setState: (newState: IWorldState) => void;
}

export interface IWorld {
  data: IWorldData;
  getData: () => IWorldData;
  setData: (newData: IWorldData) => void;
}
