const path = require("path");
const http = require("http");
const express = require("express");
const connectDB = require("./config/db");
const socketio = require("socket.io");
const setUpSocketio = require("./utils/setUpSocketio");

const app = express();

// connect Database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use("/api/chat", require("./routes/chat"));
app.use("/api/rooms", require("./routes/rooms"));

const server = http.createServer(app);
const io = socketio(server);

setUpSocketio(io);

const PORT = process.env.PORT || 5555;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
