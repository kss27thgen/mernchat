function formatMessage(_id, username, content) {
	return {
		_id,
		username,
		content,
		time: Date.now(),
	};
}

module.exports = formatMessage;
