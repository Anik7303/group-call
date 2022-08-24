import { readFileSync } from "fs";
import { join } from "path";
import { createServer, ServerOptions as HttpsServerOptions } from "https";
import express from "express";
import { Server } from "socket.io";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SockeData,
} from "./interfaces/socket";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "5000";
const keyFile = readFileSync(join("keys", "key.pem"));
const certFile = readFileSync(join("keys", "cert.pem"));
const httpsOptions: HttpsServerOptions = {
  key: keyFile,
  cert: certFile,
};

const app = express();
const httpServer = createServer(httpsOptions, app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SockeData
>(httpServer);
io.on("connection", (socket) => {
  console.log(`${socket.id} connected to socket.io server`);
});

app.use((req: express.Request, res: express.Response) => {
  const { method, url } = req;
  const message = `Accessing ${method.toUpperCase()} ${url}`;
  res.status(200).json({ message, method, url });
});

httpServer.listen(parseInt(PORT), HOST, () => {
  console.log(`Server address: https://${HOST}:${PORT}`);
});
