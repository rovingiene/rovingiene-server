const events = {
  // Global
  error: "error",
  disconnect: "disconnect",
  connect: "connect",
  status: "status",
  results: "results",
  tick: "tick",
  connection: "connection",
  connectError: "connect_error",
  ping: "ping",

  // Games
  find: "find",
  join: "join",

  // GameConq
  regjoin: "regjoin",
  move: "move",
  start: "start",

  // GameRPS
  choose: "choose",
  execute: "execute",

  // CHAT
  send: "send",
  recieve: "recieve",
  chatting: "chatting",
};

export default events;
