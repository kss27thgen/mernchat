import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFileImage,
	faToggleOn,
	faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import socket from "../../utils/socket";
import UserContext from "../../context/user/userContext";
import RoomContext from "../../context/room/roomContext";

const ChatForm = (props) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const { currentUser, toggleMenu, menu } = userContext;
	const { currentRoom } = roomContext;

	const [content, setContent] = useState("");

	const handleInput = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (menu) {
		} else {
			emitChat();
			postChat();
		}
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
		const res = await axios.post(`/api/chat/${currentRoom._id}`, newChat);
	};

	return (
		<form className="chat-form" onSubmit={handleSubmit}>
			<div className="chat-input-wrapper">
				<input
					className="chat-input"
					name="content"
					autoComplete="off"
					value={content}
					placeholder={menu ? "Create Channel" : "Say something..."}
					onChange={handleInput}
				/>
				{!menu && (
					<label htmlFor="file">
						<FontAwesomeIcon
							className="icon-camera"
							icon={faFileImage}
						/>
					</label>
				)}
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
