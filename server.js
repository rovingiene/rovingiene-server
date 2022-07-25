import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// API
import user from "./routes/user.js";

// Socket
import { Server } from "socket.io";
import socketGameConq from "./handlers/socketGameConq.js";
import gameTypes from "./constants/gameTypes.js";
import events from "./constants/socketEvents.js";
import { onMessage } from "./utils/socketUtils.js";
import "./gist.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Express + javascript Server..");
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const io = new Server(server, { cors: "*" });

io.on(events.connection, (socket) => {
  const { gameType } = socket.handshake.query;
  console.log("A user is connected");
  console.log(io.sockets.sockets.size);

  onMessage(socket, events.ping, (callback) => {
    callback();
  });

  switch (gameType) {
    case gameTypes.gameConq:
      socketGameConq(socket, io);
      break;
  }
});
