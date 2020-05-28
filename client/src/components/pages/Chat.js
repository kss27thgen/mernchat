import React, { useContext, useEffect, Children } from "react";
import axios from "axios";
import UserContext from "../../context/user/userContext";
import RoomContext from "../../context/room/roomContext";
import ChatForm from "../chat/ChatForm";
import ChatList from "../chat/ChatList";

const Chat = (props) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const { currentUser } = userContext;
	const { setRooms, setCurrentRoom } = roomContext;

	useEffect(() => {
		fetchRooms();
	}, []);

	const fetchRooms = async () => {
		const res = await axios.get("/api/rooms").catch((err) => {
			if (err.response.status === 500) {
				window.location.reload();
			}
		});
		setRooms(res.data);
		setCurrentRoom(res.data[0]);
	};

	return (
		<div className="container">
			<div className="chat">
				<ChatList currentUser={currentUser} />
				<ChatForm />
			</div>
		</div>
	);
};

export default Chat;
