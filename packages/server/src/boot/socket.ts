import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export default function createSocketIo(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
  });

  return io;
}
