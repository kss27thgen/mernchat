const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
	roomname: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("room", RoomSchema);
