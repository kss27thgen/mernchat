import React, { useState, useContext, useEffect } from "react";
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
import { storage } from "../../firebase";

const ChatForm = (props) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const { currentUser, toggleMenu, menu } = userContext;
	const { currentRoom } = roomContext;

	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);
	const [filename, setFilename] = useState(null);

	const handleInput = (e) => {
		setContent(e.target.value);
	};

	const handleFileInput = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (menu) {
			postRoom();
		} else {
			postChat();
		}
		setContent("");
		setFile(null);
		setFilename(null);
	};

	const postRoom = async () => {
		const res = await axios.post("/api/rooms", { roomname: content });
		emitRoom();
	};

	const emitRoom = () => {
		socket.emit("createRoom");
	};

	const emitChat = (newChat) => {
		socket.emit("chatMessage", { ...newChat, roomId: currentRoom._id });
	};

	const postChat = async () => {
		const newChat = {
			username: currentUser.username,
			content,
		};

		if (file) {
			await storage.ref().child(`images/${filename}`).put(file);

			await storage
				.ref()
				.child(`images/${filename}`)
				.getDownloadURL()
				.then((url) => {
					newChat.file = url;
				});
		}
		emitChat(newChat);
		const res = await axios.post(`/api/chat/${currentRoom._id}`, newChat);
	};

	return (
		<form className="chat-form" onSubmit={handleSubmit}>
			<div className="chat-input-wrapper">
				{filename && <p>{filename}</p>}
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
				<input
					type="file"
					id="file"
					hidden
					onChange={handleFileInput}
				/>
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
