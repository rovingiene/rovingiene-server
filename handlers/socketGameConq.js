import events from "../data/socketEvents.js";
import { onMessage, sendMessage } from "../utils/socketUtils.js";

const socketGameConq = (socket, io) => {
  var playing = 0;
  const status = {
    players: io.sockets.sockets.size,
    playing: playing,
  };
  playing += 1;

  sendMessage(socket, events.status, status);

  onMessage(socket, events.move, (res) => {
    console.log(res);
  });

  onMessage(socket, events.disconnect, () => {
    console.log("Socket Disconnected");
    playing -= 1;
    sendMessage(io, events.status, status);
  });
};

export default socketGameConq;
