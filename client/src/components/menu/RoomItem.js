import React, { useContext } from "react";
import RoomContext from "../../context/room/roomContext";
import UserContext from "../../context/user/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RoomItem = ({ room }) => {
	const roomContext = useContext(RoomContext);
	const userContext = useContext(UserContext);
	const { setCurrentRoom } = roomContext;
	const { toggleMenu } = userContext;

	const handleClick = () => {
		setCurrentRoom(room);
		toggleMenu();
	};

	const handleDelete = () => {};

	return (
		<div className="room-item" onClick={handleClick}>
			<p className="room-item__name">{room.roomname}</p>
			<FontAwesomeIcon
				className="room-item__icon"
				icon={faTimes}
				onClick={handleDelete}
			/>
		</div>
	);
};

export default RoomItem;
