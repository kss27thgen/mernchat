import io from "socket.io-client";
const socket = io.connect("http://localhost:5555");

export default socket;
