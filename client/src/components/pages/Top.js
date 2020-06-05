import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import UserContext from "../../context/user/userContext";
import ErrorContext from "../../context/error/errorContext";
import Loader from "./Loader";
import RoomContext from "../../context/room/roomContext";

const Top = (props) => {
	const userContext = useContext(UserContext);
	const roomContext = useContext(RoomContext);
	const errorContext = useContext(ErrorContext);

	const { setCurrent, addUser } = userContext;
	const { rooms, setRooms, setCurrentRoom } = roomContext;
	const { errors, setError } = errorContext;

	const [loading, setLoading] = useState(true);

	const [currentUser, setCurrentUser] = useState({
		username: "",
		roomId: "",
	});

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
		setLoading(false);
	};

	const handleChange = (e) => {
		setCurrentUser({
			...currentUser,
			[e.target.name]: e.target.value,
		});
		setCurrentRoom(rooms[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!currentUser.username) {
			return setError({
				id: uuidv4(),
				message: "Your name is required",
			});
		}

		currentUser.id = uuidv4();
		addUser(currentUser);
		setCurrent(currentUser);
		props.history.push("/chat");
	};

	const renderOptions = () => {
		return rooms.map((room, i) => (
			<option key={i} value={room._id}>
				{" "}
				{room.roomname}
			</option>
		));
	};

	return loading ? (
		<Loader />
	) : (
		<div className="top">
			{" "}
			<form className="top-form" onSubmit={handleSubmit}>
				{" "}
				{errors.length > 0 &&
					errors.map((error, i) => (
						<p className="error-text" key={i}>
							{" "}
							{error.message}
						</p>
					))}
				<div className="form-control">
					{" "}
					<input
						type="text"
						name="username"
						id="username"
						value={currentUser.username}
						placeholder="Enter username..."
						autoComplete="off"
						onChange={handleChange}
					/>{" "}
				</div>{" "}
				{/* <div className="form-control">
					{" "}
					<label htmlFor="roomId">Rooms</label>{" "}
					<select name="roomId" id="roomId" onChange={handleChange}>
						{" "}
						<option unselectable="on" value="">
							{" "}
							Select One{" "}
						</option>{" "}
						{renderOptions()}
					</select>{" "}
				</div>{" "} */}
				<button type="submit" className="button">
					{" "}
					Join Chat{" "}
				</button>{" "}
			</form>{" "}
		</div>
	);
};

export default Top;
