import { Server } from "socket.io";

import { IWorld, IWorldState } from "../types";

type TickCallback = (curState: IWorldState) => IWorldState;

export default function beginBroadcastTick(
  io: Server,
  world: IWorld,
  tickIntervalMs: number,
  callbacks?: TickCallback[]
) {
  setInterval(
    (currentState: IWorldState) => {
      callbacks?.forEach((cb) => {
        world.setState(cb(currentState));
      });
      io.emit("worldState", world.getState());
    },
    tickIntervalMs,
    world.getState()
  );
}
