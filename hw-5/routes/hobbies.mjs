import { getUserById } from './users.mjs';

export function addHobby(userId, hobby) {
  const user = getUserById(userId);
  if (user) {
    if (!user.hobbies.includes(hobby)) {
      user.hobbies.push(hobby);
      return true;
    } else {
      return false;
    }
  }
  return null;
}

export function deleteHobby(userId, hobby) {
  const user = getUserById(userId);
  if (user) {
    const index = user.hobbies.indexOf(hobby);
    if (index !== -1) {
      user.hobbies.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  return null;
}

export function getUserHobbies(userId) {
  const user = getUserById(userId);
  return user ? user.hobbies : null;
}
