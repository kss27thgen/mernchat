import React, { useContext, useEffect, Children } from "react";
import UserContext from "../../context/user/userContext";
import ErrorContext from "../../context/error/errorContext";
import ChatForm from "../chat/ChatForm";
import ChatList from "../chat/ChatList";

const Chat = (props) => {
	const userContext = useContext(UserContext);
	const { currentUser } = userContext;

	// useEffect(() => {
	// 	if (currentUser === null) {
	// 		props.history.push("/");
	// 	}
	// }, []);

	return (
		<div className="container">
			<div className="chat">
				<ChatList currentUser={currentUser} />
				<ChatForm />
			</div>
		</div>
	);
};

export default Chat;
