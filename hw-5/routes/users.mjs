import users from '../data/users.mjs';

function generateUserId() {
  const ids = users.map(user => user.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function createUser(user) {
  const userId = generateUserId();
  const newUser = { id: userId, ...user };
  users.push(newUser);
  return newUser;
}

export function deleteUser(userId) {
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    return true; 
  }
  return false; 
}

export function updateUser(userId, updatedData) {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return users[userIndex];
  }
  return null; 
}

export function getUserById(userId) {
  return users.find(user => user.id === userId);
}

export function listUsers() {
  const usersWithLinks = users.map(user => {
    // Return user data with HATEOAS links
    const { hobbies, ...userData } = user;
    const userId = user.id;

    userData.links = {
      self: `/user?id=${userId}`,
      hobbies: `/hobbies?id=${userId}`,
    };

    return userData;
  });

  return usersWithLinks;
}
