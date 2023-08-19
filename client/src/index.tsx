import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import name from './api'

// socket.on('event', (payload) => {}); - подписка на событие
// socket.emit('event', payload) - генерация события (на сервер)

const socket = io("http://localhost:5000");
socket.on("EVENT_FOR_ALL", (payload) => {
  // console.log(payload);
});
socket.on("EVENT_FOR_SELF", (payload) => {
  // console.log("payload for self:", payload);
});
socket.on("EVENT_FOR_OTHER", (payload) => {
  // console.log("payload for other:", payload)
})
socket.emit('EVENT_FROM_SOCKET', 'Hello from client')
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
socket.on('SOME_EVENT_ON_SOME_SOCKET', (payload) => {
  console.log('payload', payload)
})
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
