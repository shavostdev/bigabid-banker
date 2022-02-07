import socketIOClient from "socket.io-client";
let endPoint = "http://127.0.0.1:8080"

export const socket = socketIOClient(endPoint);
