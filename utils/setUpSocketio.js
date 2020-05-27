const formatMessage = require("./messages");
const { v4: uuidv4 } = require("uuid");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("./users");

module.exports = (io) => {
	const botName = "Bot";

	// Run when client connects
	io.on("connection", (socket) => {
		socket.on("joinRoom", ({ username, roomId }) => {
			const user = userJoin(socket.id, username, roomId);

			socket.join(user.roomId);

			// Welcome current user
			socket.emit(
				"message",
				formatMessage(
					uuidv4(),
					botName,
					`(${user.username}), Welcome to Chatroom!`,
				),
			);

			// Broadcast when a user connects
			socket.broadcast
				.to(user.roomId)
				.emit(
					"message",
					formatMessage(
						uuidv4(),
						botName,
						`(${user.username}) has joined the chat`,
					),
				);

			// Send users and roomId info
			io.to(user.roomId).emit("roomUsers", {
				roomId: user.roomId,
				users: getRoomUsers(user.roomId),
			});
		});

		// Listen for chatMessage
		socket.on("chatMessage", (msg) => {
			const user = getCurrentUser(socket.id);

			io.to(user.roomId).emit(
				"message",
				formatMessage(uuidv4(), user.username, msg),
			);
		});

		// Runs when client disconnects
		socket.on("disconnect", () => {
			const user = userLeave(socket.id);

			if (user) {
				io.to(user.roomId).emit(
					"message",
					formatMessage(
						uuidv4(),
						botName,
						`(${user.username}) has left the chat`,
					),
				);

				// Send users and roomId info
				io.to(user.roomId).emit("roomUsers", {
					roomId: user.roomId,
					users: getRoomUsers(user.roomId),
				});
			}
		});
	});
};
