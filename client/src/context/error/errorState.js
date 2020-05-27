import React, { useReducer } from "react";
import ErrorContext from "./errorContext";
import errorReducer from "./errorReducer";
import { SET_ERROR, CLEAR_ERRORS } from "../type";

const ErrorState = (props) => {
	const initialState = {
		errors: [],
	};

	const [state, dispatch] = useReducer(errorReducer, initialState);

	// Set errro
	const setError = (error) => {
		dispatch({
			type: SET_ERROR,
			payload: error,
		});
		setTimeout(() => {
			dispatch({ type: CLEAR_ERRORS, payload: error.id });
		}, 5000);
	};

	return (
		<ErrorContext.Provider
			value={{
				errors: state.errors,
				setError,
			}}
		>
			{props.children}
		</ErrorContext.Provider>
	);
};

export default ErrorState;
