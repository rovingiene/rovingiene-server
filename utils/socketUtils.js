import events from "../constants/socketEvents.js";

/*@flow*/
export const sendMessage = (socket, event, res) => {
  if (event === events.error) {
    sendErrorMessage(socket, res);
    return;
  }
  socket.emit(event, res);
};

export const onMessage = (socket, event, listener) => {
  socket.on(event, listener);
};

const sendErrorMessage = (socket, res) => {
  console.log(res);
  socket.emit(events.error, res);
};
