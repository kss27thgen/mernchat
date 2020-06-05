import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
	SET_CURRENT,
	ADD_USER,
	CLEAR_CURRENT,
	ENTER_MENU,
	LEAVE_MENU,
	TOGLLE_MENU,
} from "../type";

const UserState = (props) => {
	const initialState = {
		users: [],
		currentUser: null,
		menu: true,
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

	const enterMenu = () => {
		dispatch({ type: ENTER_MENU });
	};

	const leaveMenu = () => {
		dispatch({ type: LEAVE_MENU });
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
				enterMenu,
				leaveMenu,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
