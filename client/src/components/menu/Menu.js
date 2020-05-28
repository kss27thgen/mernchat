import React, { useContext } from "react";
import RoomContext from "../../context/room/roomContext";
import UserContext from "../../context/user/userContext";
import Loader from "../pages/Loader";
import RoomItem from "./RoomItem";

const Menu = () => {
	const roomContext = useContext(RoomContext);
	const { rooms } = roomContext;

	return (
		<div className="menu">
			{rooms.length === 0 ? (
				<Loader />
			) : (
				<>
					<h2 className="menu-title">Channels</h2>
					{rooms.map((room) => (
						<RoomItem key={room._id} room={room} />
					))}
				</>
			)}
		</div>
	);
};

export default Menu;
