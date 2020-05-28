import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import { SET_CURRENT, ADD_USER, CLEAR_CURRENT, TOGLLE_MENU } from "../type";

const UserState = (props) => {
	const initialState = {
		users: [],
		currentUser: null,
		menu: false,
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	// Add current user
	const setCurrent = (user) => {
		dispatch({ type: SET_CURRENT, payload: user });
	};

	// Add user
	const addUser = (user) => {
		dispatch({ type: ADD_USER, payload: user });
	};

	// Toggle menu
	const toggleMenu = () => {
		dispatch({ type: TOGLLE_MENU });
	};

	return (
		<UserContext.Provider
			value={{
				users: state.users,
				currentUser: state.currentUser,
				menu: state.menu,
				setCurrent,
				addUser,
				toggleMenu,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
