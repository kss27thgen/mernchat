import io from "socket.io-client";
const socket = io.connect("http://localhost:5556");

export default socket;
