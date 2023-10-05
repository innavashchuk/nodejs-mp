import http from 'http';
import url from 'url';
import { createUser, deleteUser, updateUser, getUserById, listUsers } from './routes/users.mjs';
import { addHobby, deleteHobby, getUserHobbies } from './routes/hobbies.mjs';

const server = http.createServer((req, res) => {
  const { method, url: requestUrl } = req;
  const parsedUrl = url.parse(requestUrl, true);
  const { pathname, query } = parsedUrl;

  if (method === 'GET') {
    if (pathname === '/users') {
      const usersList = listUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usersList));
    } else if (pathname === '/user') {
      // Retrieve user by ID
      const userId = parseInt(query.id);
      const user = getUserById(userId);
      if (user) {
        user.links = {
          self: `/user?id=${userId}`,
          hobbies: `/hobbies?id=${userId}`,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      }
    } else if (pathname === '/hobbies') {
      // Retrieve list of user hobbies by user ID
      const userId = parseInt(query.id);
      const userHobbies = getUserHobbies(userId);
      if (userHobbies) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userHobbies));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      }
    }
  } else if (method === 'POST') {
    if (pathname === '/users') {
      // Create a new user
      let requestBody = '';
      req.on('data', chunk => {
        requestBody += chunk.toString();
      });
      req.on('end', () => {
        const newUser = JSON.parse(requestBody);
        const createdUser = createUser(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdUser));
      });
    } else if (pathname === '/hobbies') {
      // Add a hobby to a user's list of hobbies
      const userId = parseInt(query.id);
      const hobby = query.hobby;
      const hobbyAdded = addHobby(userId, hobby);
      if (hobbyAdded !== null) {
        if (hobbyAdded) {
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end('Hobby added successfully');
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Hobby already exists for the user');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      }
    }
  } else if (method === 'DELETE') {
    if (pathname === '/users') {
      // Delete a user by ID
      const userId = parseInt(query.id);
      const userDeleted = deleteUser(userId);
      if (userDeleted) {
        res.writeHead(204);
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      }
    } else if (pathname === '/hobbies') {
      // Delete a hobby from a user's list of hobbies
      const userId = parseInt(query.id);
      const hobby = query.hobby;
      const hobbyDeleted = deleteHobby(userId, hobby);
      if (hobbyDeleted !== null) {
        if (hobbyDeleted) {
          res.writeHead(204);
          res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Hobby not found for the user');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      }
    }
  } else if (method === 'PUT') {
    if (pathname === '/users') {
      // Update user properties
      const userId = parseInt(query.id);
      let requestBody = '';
      req.on('data', chunk => {
        requestBody += chunk.toString();
      });
      req.on('end', () => {
        const updatedData = JSON.parse(requestBody);
        const updatedUser = updateUser(userId, updatedData);
        if (updatedUser !== null) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedUser));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('User not found');
        }
      });
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
