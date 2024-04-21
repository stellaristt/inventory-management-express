const { findUsers, findUserById, insertUser, deleteUser, editUser } = require("./user.repository");

async function getAllUsers() {
  const users = await findUsers();
  return users;
}

async function getUserById(id) {
  const user = await findUserById(id);
  if (!user) {
    throw Error("User not found");
  }
  return user;
}

async function createUser(newUserData) {
  const newUser = await insertUser(newUserData);
  return newUser;
}

async function deleteUserById(id) {
  await getUserById(id);
  await deleteUser(id);
}

async function editUserById(id, userData) {
  await getUserById(id);
  const updatedUser = await editUser(id, userData);
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  editUserById,
};