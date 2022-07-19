import events from "../data/socketEvents.js";
import { onMessage, sendMessage } from "../utils/socketUtils.js";

const socketGameConq = (socket, io) => {
  var playing = 0;
  const status = {
    players: io.sockets.sockets.size,
    playing: playing,
  };

  sendMessage(socket, events.status, status);
  playing += 1;

  onMessage(socket, events.disconnect, () => {
    console.log("Socket Disconnected");
    sendMessage(io, events.status, status);
  });
};

export default socketGameConq;
