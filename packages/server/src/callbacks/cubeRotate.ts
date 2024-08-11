import { IWorldState } from "../types";

export default function cubeRotate(curState: IWorldState): IWorldState {
  if (
    curState.cubeState.transform.position[1] > 8 ||
    curState.cubeState.transform.position[1] < 2
  ) {
    curState.cubeState.delta *= -1;
  }
  curState.cubeState.transform.position[1] +=
    curState.cubeState.delta;
  curState.cubeState.transform.rotation[0] +=
    curState.cubeState.delta;
  curState.cubeState.transform.rotation[1] +=
    curState.cubeState.delta;
  curState.cubeState.transform.rotation[2] +=
    curState.cubeState.delta;
  return curState;
}
