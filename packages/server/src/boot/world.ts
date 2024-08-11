import { IWorld } from "../types.js";

export default function createWorld(): IWorld {
  return {
    state: {
      cubeState: {
        delta: 0.01,
        transform: {
          position: [0, 4, 0],
          rotation: [0, 0, 0],
        },
      },
    },
    getState: function () {
      return this.state;
    },
    setState: function (newState) {
      this.state = newState;
    },
  };
}
