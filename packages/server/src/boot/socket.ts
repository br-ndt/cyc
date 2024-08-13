import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { IWorld } from "../types";

export default function createSocketIo(server: HttpServer, world: IWorld) {
  const serverArgs =
    process.env.NODE_ENV === "development"
      ? {
          cors: {
            origin: "http://localhost:5173",
          },
        }
      : undefined;
  const io = new Server(server, serverArgs);

  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("hoverChange", (isHover) => {
      const newWorld = world.getData().getState();
      newWorld.cube.isHovered = isHover;
      world.getData().setState(newWorld);
      io.emit("cubeHover", isHover);
    });

    socket.on("resetBox", () => {
      world.data.physics.bodies[2].position.set(0, 10, 0);
      world.data.physics.bodies[2].velocity.set(0, 0, 0);
    });

    socket.on("resetSphere", () => {
      world.data.physics.bodies[1].position.set(0, 10, 0);
      world.data.physics.bodies[1].velocity.set(0, 0, 0);
    });
  });

  return io;
}
