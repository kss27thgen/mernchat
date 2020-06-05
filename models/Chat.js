const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "rooms",
	},
	username: {
		type: String,
		required: true,
		default: "NONAME",
	},
	roomId: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	file: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("chat", ChatSchema);
