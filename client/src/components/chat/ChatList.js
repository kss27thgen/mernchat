import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
import { withRouter } from "react-router-dom";
import socket from "../../utils/socket";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ChatList = ({ history, currentUser }) => {
	const [chat, setChat] = useState([]);

	useEffect(() => {
		if (!currentUser) {
			history.push("/");
		} else {
			fetchChat();

			socket.on("message", (message) => {
				setChat((chat) => [message, ...chat]);
			});

			setTimeout(() => {
				socket.emit("joinRoom", {
					username: currentUser.username,
					roomId: currentUser.roomId,
				});
			}, 1500);
		}

		return () => {
			window.location.reload();
		};
	}, []);

	const fetchChat = async () => {
		const res = await axios.get(`/api/chat/${currentUser.roomId}`);

		setChat(res.data);
	};

	return (
		<div className="chat-list-wrapper">
			<TransitionGroup component="div" className="chat-list">
				{chat.length > 0 &&
					chat.map((chat) => (
						<CSSTransition
							key={chat._id}
							timeout={800}
							classNames="item"
						>
							<ChatItem chat={chat} />
						</CSSTransition>
					))}
			</TransitionGroup>
		</div>
	);
};

export default withRouter(ChatList);
