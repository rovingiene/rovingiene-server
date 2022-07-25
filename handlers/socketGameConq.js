import events from "../constants/socketEvents.js";
import { onMessage, sendMessage } from "../utils/socketUtils.js";

var gameMap = new Map();
var timerMap = new Map();
var queueMap = new Map();

const socketGameConq = (socket, io) => {
  var playing = 0;
  const status = {
    players: io.sockets.sockets.size,
    playing: playing,
  };

  playing += 1;

  sendMessage(socket, events.status, status);

  onMessage(socket, events.startCountdown, () => {
    console.log("counting down");
    let countdownTimer = 10;
    let countdown = setInterval(() => {
      countdownTimer -= 1;
      for (let test = 0; test < 1000000; test++) {
        console.log(test);
      }
      sendMessage(socket, events.countdown, countdownTimer);
      if (countdownTimer === 0) {
        clearInterval(countdown);
      }
    }, 1000);
  });

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
