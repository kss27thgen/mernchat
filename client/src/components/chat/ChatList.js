import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
import { withRouter } from "react-router-dom";
import socket from "../../utils/socket";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Menu from "../menu/Menu";
import UserContext from "../../context/user/userContext";
import RoomContext from "../../context/room/roomContext";
import Loader from "../pages/Loader";

const ChatList = ({ history, currentUser }) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const { menu, toggleMenu } = userContext;
	const { currentRoom } = roomContext;

	const [chat, setChat] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!currentUser) {
			history.push("/");
		} else {
			socket.on("message", (message) => {
				setChat((chat) => [message, ...chat]);
			});

			setTimeout(() => {
				socket.emit("joinRoom", {
					username: currentUser.username,
					roomId: currentUser.roomId,
				});
			}, 2000);
		}

		return () => {
			window.location.reload();
		};
	}, []);

	useEffect(() => {
		if (currentRoom) {
			fetchChat();
		}
	}, [menu]);

	const fetchChat = async () => {
		setLoading(true);
		console.log("fetch chat");
		console.log(chat);
		const res = await axios.get(`/api/chat/${currentRoom._id}`);

		setChat(res.data);
		setLoading(false);
	};

	const renderChatList = () => {
		if (chat.length === 0 && loading) {
			return <Loader />;
		} else if (chat.length === 0) {
			return <p>No post yet..</p>;
		} else {
			return (
				<TransitionGroup component="div">
					{chat.map((chat) => (
						<CSSTransition
							key={chat._id}
							timeout={500}
							classNames="item"
							in={true}
							component="div"
						>
							<ChatItem chat={chat} />
						</CSSTransition>
					))}
				</TransitionGroup>
			);
		}
	};

	return menu ? (
		<Menu />
	) : (
		<div className="chat-list-wrapper">
			{currentRoom && (
				<p className="room-list-roomname">{currentRoom.roomname}</p>
			)}
			<div className="chat-list">{renderChatList()}</div>
		</div>
	);
};

export default withRouter(ChatList);
