import http from 'http';
import hobbiesData from '../data/hobbies.mjs';
import usersData from '../data/users.mjs';

const server = http.createServer((req, res) => {
    if (req.url === '/hobbies' && req.method === 'GET') {
        // Retrieve a list of hobbies
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(hobbiesData));
    } else if (req.url.match(/\/users\/(\d+)\/hobbies/) && req.method === 'GET') {
        // Retrieve a list of user hobbies
        const userId = req.url.match(/\/users\/(\d+)\/hobbies/)[1];
        const user = usersData.find(u => u.id === parseInt(userId));
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ hobbies: user.hobbies }));
    } else if (req.url.match(/\/users\/(\d+)\/hobbies/) && req.method === 'POST') {
        // Add a hobby for a specific user
        const userId = req.url.match(/\/users\/(\d+)\/hobbies/)[1];
        const user = usersData.find(u => u.id === parseInt(userId));
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        // Add a hobby to the user's hobbies array.
        // const requestBody = await getRequestBody(req);
        // user.hobbies.push(requestBody.hobby);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hobby added successfully' }));
    } else if (req.url.match(/\/users\/(\d+)\/hobbies/) && req.method === 'DELETE') {
        // Delete a hobby for a specific user
        const userId = req.url.match(/\/users\/(\d+)\/hobbies/)[1];
        const user = usersData.find(u => u.id === parseInt(userId));
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        // Delete a hobby from the user's hobbies array.
        const hobbyToDelete = req.url.split('/').pop();
        const index = user.hobbies.indexOf(hobbyToDelete);
        if (index !== -1) {
            user.hobbies.splice(index, 1);
        }

        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

export default server;
