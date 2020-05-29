function formatMessage(_id, username, content, file) {
	return {
		_id,
		username,
		content,
		file,
		time: Date.now(),
	};
}

module.exports = formatMessage;
