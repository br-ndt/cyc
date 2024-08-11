import express from "express";
import path from "path";

export default function createExpressApp(serverFileName: string) {
  const server__dirname = path.dirname(serverFileName);
  if (process.env.NODE_ENV === "development") {
    console.log("setting up development...");
  }

  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(server__dirname, "static")));

  return app;
}
