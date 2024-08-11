import dotenv from "dotenv";
import { createServer } from "http";
import url from "url";

import createExpressApp from "./boot/express.js";
import createSocketIo from "./boot/socket.js";

interface Transform {
  position: number[];
  rotation: number[];
}

dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);

const HOST = "0.0.0.0";
const PORT = process.env.NODE_ENV === "development" ? 3000 : 6869;

const express = createExpressApp(__filename);
const server = createServer(express);
const io = createSocketIo(server);

server.listen(PORT, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});
