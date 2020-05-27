import { SET_CURRENT, ADD_USER, CLEAR_CURRENT } from "../type";

export default (state, action) => {
	switch (action.type) {
		case SET_CURRENT:
			return {
				...state,
				currentUser: action.payload,
			};
		case ADD_USER:
			return {
				...state,
				users: [action.payload, ...state.users],
			};
		default:
			return state;
	}
};
