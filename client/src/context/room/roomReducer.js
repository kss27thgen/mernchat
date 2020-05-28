import { SET_ROOMS, SET_CURRENT_ROOM } from "../type";

export default (state, action) => {
	switch (action.type) {
		case SET_ROOMS:
			return {
				...state,
				rooms: [...action.payload],
			};
		case SET_CURRENT_ROOM:
			return {
				...state,
				currentRoom: action.payload,
			};
		default:
			return state;
	}
};
