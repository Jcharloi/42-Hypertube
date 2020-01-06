import socketIOClient from "socket.io-client";

const socket = socketIOClient(window.location.origin);

export default { socket };
