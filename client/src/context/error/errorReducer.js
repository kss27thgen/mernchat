import { SET_ERROR, CLEAR_ERRORS } from "../type";

export default (state, action) => {
	switch (action.type) {
		case SET_ERROR:
			return {
				...state,
				errors: [action.payload, ...state.errors],
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: state.errors.filter(
					(error) => error.id !== action.payload,
				),
			};
		default:
			return state;
	}
};
