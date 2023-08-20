const { Server } = require("socket.io");
const { Message } = require("./models");
const {
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_CREATED, NEW_MESSAGE_ERROR },
} = require("./constants");

const socketInit = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000" },
  });
  io.on("connection", (socket) => {
    console.log("socket is connected");
    const newMessageHandler = async (payload) => {
      console.log("payload", payload);
      try {
        const createdMessage = await Message.create(payload);
        io.emit(NEW_MESSAGE_CREATED, createdMessage.toObject());
      } catch (error) {
        socket.emit(NEW_MESSAGE_ERROR, error);
      }
    };
    socket.on(NEW_MESSAGE, newMessageHandler);
  });
};

module.exports = socketInit;
