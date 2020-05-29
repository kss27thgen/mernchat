import React, { useContext } from "react";
import axios from "axios";
import RoomContext from "../../context/room/roomContext";
import UserContext from "../../context/user/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";

const RoomItem = ({ room }) => {
	const roomContext = useContext(RoomContext);
	const userContext = useContext(UserContext);
	const { setCurrentRoom, setRooms } = roomContext;
	const { toggleMenu } = userContext;

	const handleClick = () => {
		setCurrentRoom(room);
		toggleMenu();
	};

	const handleDelete = async () => {
		if (window.confirm("Delete this channel. Are you sure?")) {
			const res = await axios.delete(`/api/rooms/${room._id}`);

			socket.emit("deleteRoom");
		}
	};

	return (
		<div className="room-item">
			<p className="room-item__name" onClick={handleClick}>
				{room.roomname}
			</p>
			<FontAwesomeIcon
				className="room-item__icon"
				icon={faTimes}
				onClick={handleDelete}
			/>
		</div>
	);
};

export default RoomItem;
