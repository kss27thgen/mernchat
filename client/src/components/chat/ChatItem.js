import React from "react";
import moment from "moment";

const ChatItem = ({ chat }) => {
	return (
		<div className="chat-item">
			<div className="chat-item__info">
				<p className="chat-item__info__name">
					{chat.username.charAt(0).toUpperCase() +
						chat.username.slice(1)}
				</p>
				<p className="chat-item__info__time">
					{moment(chat.date).fromNow()}
				</p>
			</div>
			<div className="chat-item__content">{chat.content}</div>
		</div>
	);
};

export default ChatItem;
