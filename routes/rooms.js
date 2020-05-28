const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const { check, validationResult } = require("express-validator");

// @route GET api/rooms
// @desk Get all rooms
router.get("/", async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route GET api/rooms/:roomId
// @desk Get room by id
router.get("/:roomId", async (req, res) => {
	try {
		const room = await Room.findOne({ _id: req.params.roomId });
		res.json(room);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route POST api/rooms
// @desk Add new room
router.post(
	"/",
	[check("roomname", "RoomName required").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { roomname } = req.body;

		try {
			const newRoom = new Room({
				roomname,
			});

			const room = await newRoom.save();

			res.json(room);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	},
);

// @route DELETE api/rooms/:id
// @desk Delete user
router.delete("/:id", async (req, res) => {
	try {
		let room = await Room.findById(req.params.id);
		if (!room)
			return res.status(404).json({ message: "Message not found" });

		await Room.findByIdAndRemove(req.params.id);
		const rooms = await Room.find();
		res.json({ rooms });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
