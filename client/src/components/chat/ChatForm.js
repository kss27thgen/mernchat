import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFileImage,
	faCamera,
	faToggleOn,
	faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import socket from "../../utils/socket";
import UserContext from "../../context/user/userContext";

const ChatForm = (props) => {
	const userContext = useContext(UserContext);
	const { currentUser, toggleMenu, menu } = userContext;

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
			<div className="chat-input-wrapper">
				<input
					className="chat-input"
					name="content"
					autoComplete="off"
					value={content}
					placeholder="Say something..."
					onChange={handleInput}
				/>
				<label htmlFor="file">
					<FontAwesomeIcon
						className="icon-camera"
						icon={faFileImage}
					/>
				</label>
				<input type="file" id="file" hidden />
			</div>
			<div className="chat-button" onClick={() => toggleMenu()}>
				<FontAwesomeIcon
					className="icon-menu"
					icon={menu ? faToggleOff : faToggleOn}
				/>
			</div>
		</form>
	);
};

export default ChatForm;
