import { SET_CURRENT, ADD_USER, CLEAR_CURRENT, TOGLLE_MENU } from "../type";

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
		case TOGLLE_MENU:
			return {
				...state,
				menu: !state.menu,
			};
		default:
			return state;
	}
};
