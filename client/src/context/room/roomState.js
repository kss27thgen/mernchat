import React, { useReducer } from "react";
import RoomContext from "./roomContext";
import roomReducer from "./roomReducer";
import { SET_ROOMS, SET_CURRENT_ROOM } from "../type";

const RoomState = (props) => {
	const initialState = {
		rooms: [],
		currentRoom: null,
	};

	const [state, dispatch] = useReducer(roomReducer, initialState);

	// Set rooms
	const setRooms = (rooms) => {
		dispatch({
			type: SET_ROOMS,
			payload: rooms,
		});
	};

	// Set Current room
	const setCurrentRoom = (room) => {
		dispatch({
			type: SET_CURRENT_ROOM,
			payload: room,
		});
	};

	return (
		<RoomContext.Provider
			value={{
				rooms: state.rooms,
				currentRoom: state.currentRoom,
				setRooms,
				setCurrentRoom,
			}}
		>
			{props.children}
		</RoomContext.Provider>
	);
};

export default RoomState;
