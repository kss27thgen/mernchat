const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { check, validationResult } = require("express-validator");

// @route GET api/chat/:roomId
// @desk Get all chat in the room
router.get("/:roomId", async (req, res) => {
	try {
		const chats = await Chat.find({ roomId: req.params.roomId }).sort({
			date: -1,
		});
		res.json(chats);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route POST api/chat/:roomId
// @desk Add new chat
router.post(
	"/:roomId",
	[check("content", "Say something...").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { username, content } = req.body;

		try {
			const newChat = new Chat({
				username,
				roomId: req.params.roomId,
				content,
			});

			const chat = await newChat.save();

			res.json(chat);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	},
);

// @route DELETE api/chat/:id
// @desk Delete user
router.delete("/:id", async (req, res) => {
	try {
		let chat = await Chat.findById(req.params.id);
		if (!chat)
			return res.status(404).json({ message: "Message not found" });

		await chat.findByIdAndRemove(req.params.id);
		res.json({ message: "chat removed" });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
