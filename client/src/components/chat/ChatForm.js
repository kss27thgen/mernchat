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
import { storage } from "../../firebase";

const ChatForm = (props) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const { currentUser, toggleMenu, enterMenu, leaveMenu, menu } = userContext;
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
		if (!content && !file) {
			return;
		}
		if (menu) {
			postRoom();
		} else {
			postChat();
		}
		setContent("");
		setFile("");
		setFilename("");
	};

	const postRoom = async () => {
		const res = await axios.post("/api/rooms", { roomname: content });
		emitRoom(res.data._id);
	};

	const emitRoom = (roomId) => {
		socket.emit("createRoom", roomId);
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

			const res = await storage
				.ref()
				.child(`images/${filename}`)
				.getDownloadURL();

			newChat.file = res;
		}

		const res = await axios.post(`/api/chat/${currentRoom._id}`, newChat);

		emitChat(newChat);
	};

	const handleSwitch = () => {
		if (menu) {
			leaveMenu();
		} else {
			enterMenu();
			socket.emit("leaveRoom", { currentUser, currentRoom });
		}
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
					onChange={handleFileInput}
					hidden
				/>
			</div>
			<div className="chat-button" onClick={handleSwitch}>
				<FontAwesomeIcon
					className="icon-menu"
					icon={menu ? faToggleOff : faToggleOn}
				/>
			</div>
		</form>
	);
};

export default ChatForm;
