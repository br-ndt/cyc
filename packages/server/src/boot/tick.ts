import { Server } from "socket.io";

import { IWorld, IWorldState } from "../types";

type TickCallback = (curState: IWorldState) => IWorldState;

export function worldStep(
  io: Server,
  world: IWorld,
  tickIntervalMs: number,
  callbacks: TickCallback[]
) {
  let tickCount = 0;
  setInterval(() => {
    const currentWorld = world.getData();
    callbacks?.forEach((cb) => {
      currentWorld.setState(cb(currentWorld.getState()));
    });
    const timeNow = performance.now();
    const deltaTime = timeNow - currentWorld.timestamp;
    currentWorld.physics.fixedStep(1 / 60, deltaTime);
    currentWorld.timestamp = timeNow;
    io.emit(
      "physics",
      currentWorld.physics.bodies.map((body) => ({
        angularVelocity: body.angularVelocity,
        position: body.position,
        quaternion: body.quaternion,
        velocity: body.velocity,
      }))
    );
    io.emit("worldState", currentWorld.state);
    world.setData(currentWorld);
    ++tickCount;
  }, tickIntervalMs);
}
