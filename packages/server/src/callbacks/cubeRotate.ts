import { IWorldState } from "../types";

export default function cubeRotate(curState: IWorldState): IWorldState {
  if (
    curState.cube.transform.position[1] > 8 ||
    curState.cube.transform.position[1] < 2
  ) {
    curState.delta *= -1;
  }
  curState.cube.transform.position[1] += curState.delta;
  curState.cube.transform.rotation[0] += curState.delta;
  curState.cube.transform.rotation[1] += curState.delta;
  curState.cube.transform.rotation[2] += curState.delta;
  return curState;
}
