import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// API
import user from "./routes/user.js";

// Socket
import { Server } from "socket.io";
import socketGameConq from "./handlers/socketGameConq.js";
import gameTypes from "./data/gameTypes.js";
import events from "./data/socketEvents.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Express + javasscript Server");
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const io = new Server(server, { cors: "*" });

io.on(events.connection, (socket) => {
  const { gameType } = socket.handshake.query;
  console.log("A user is connected");
  console.log(io.sockets.sockets.size);
  switch (gameType) {
    case gameTypes.gameConq:
      socketGameConq(socket, io);
      break;
  }
});
