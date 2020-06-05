const users = [];

// Join user to chat
function userJoin(id, username, roomId) {
	const user = { id, username, roomId };

	users.push(user);

	return user;
}

// Get current user
function getCurrentUser(id) {
	return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

// Get room users
function getRoomUsers(roomId) {
	return users.filter((user) => user.roomId === roomId);
}

function getUsers() {
	return users;
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getUsers,
};
