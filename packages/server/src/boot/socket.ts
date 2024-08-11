import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { IWorld } from "../types";

export default function createSocketIo(
  server: HttpServer,
  world: IWorld
) {
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
  });

  return io;
}
