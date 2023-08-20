import { io } from "socket.io-client";
import { createMessageError, createMessageFullfiled } from "../store/slices/messagesSlice";

const socket = io("ws://localhost:5000");

export const createMessageWs = (payload) => socket.emit("NEW_MESSAGE", payload);

export const bringStoreToWs = (store) => {
  socket.on("NEW_MESSAGE_CREATED", (payload) => {
    console.log("payload :>>", payload);
    store.dispatch(createMessageFullfiled(payload))
  });

  socket.on("NEW_MESSAGE_ERROR", (payload) => {
    console.log("error :>>", payload);
    store.dispatch(createMessageError(payload))
  });
};

export default socket;
