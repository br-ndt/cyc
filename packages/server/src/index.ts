import dotenv from "dotenv";
import { createServer } from "http";
import url from "url";

import createExpressApp from "./boot/express.js";
import createSocketIo from "./boot/socket.js";
import { worldStep } from "./boot/tick.js";
import createWorldHelper from "./boot/world.js";
import cubeRotate from "./callbacks/cubeRotate.js";

dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);

const HOST = "0.0.0.0";
const PORT = process.env.NODE_ENV === "development" ? 3000 : 6869;

const express = createExpressApp(__filename);
const server = createServer(express);
const world = createWorldHelper();
const io = createSocketIo(server, world);
worldStep(io, world, 5, [cubeRotate]);

server.listen(PORT, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});
