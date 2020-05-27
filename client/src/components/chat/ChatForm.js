import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import socket from "../../utils/socket";

const ChatForm = ({ currentUser }) => {
	const [content, setContent] = useState("");

	const handleInput = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		emitChat();
		postChat();
		setContent("");
	};

	const emitChat = () => {
		socket.emit("chatMessage", content);
	};

	const postChat = async () => {
		const newChat = {
			username: currentUser.username,
			content,
		};
		const res = await axios.post(
			`/api/chat/${currentUser.roomId}`,
			newChat,
		);
		console.log(res.data);
	};

	return (
		<form className="chat-form" onSubmit={handleSubmit}>
			<input
				className="chat-input"
				name="content"
				autoComplete="off"
				value={content}
				placeholder="Say something..."
				onChange={handleInput}
			/>
			<label className="chat-button" htmlFor="file">
				<FontAwesomeIcon className="icon-camera" icon={faCamera} />
			</label>
			<input type="file" id="file" hidden />
		</form>
	);
};

export default ChatForm;
