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
			{chat.file && (
				<a href={chat.file} target="_blank">
					<img src={chat.file} alt="image" width="200" />
				</a>
			)}
		</div>
	);
};

export default ChatItem;
