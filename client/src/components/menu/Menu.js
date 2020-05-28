import React, { useContext, useEffect } from "react";
import RoomContext from "../../context/room/roomContext";
import Loader from "../pages/Loader";
import RoomItem from "./RoomItem";
import socket from "../../utils/socket";
import axios from "axios";

const Menu = () => {
	const roomContext = useContext(RoomContext);
	const { rooms, setRooms } = roomContext;

	useEffect(() => {
		socket.on("room", () => {
			fetchRoom();
		});
	}, []);

	const fetchRoom = async () => {
		const res = await axios.get("/api/rooms");
		setRooms(res.data);
	};

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
