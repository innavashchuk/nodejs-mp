import http from 'http';
import usersData from '../data/users.mjs';

const server = http.createServer((req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const usersWithoutHobbies = usersData.map(user => {
            const { hobbies, ...userWithoutHobbies } = user;
            return userWithoutHobbies;
        });
        res.end(JSON.stringify(usersWithoutHobbies));
    } else if (req.url.match(/\/users\/(\d+)/) && req.method === 'GET') {
        const userId = req.url.match(/\/users\/(\d+)/)[1];
        const user = usersData.find(u => u.id === parseInt(userId));
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        const userWithLinks = { ...user, links: [{ rel: 'hobbies', href: `/users/${userId}/hobbies` }] };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userWithLinks));
    } else if (req.url.match(/\/users\/(\d+)/) && req.method === 'PATCH') {
    } else if (req.url.match(/\/users\/(\d+)\/hobbies/) && req.method === 'GET') {
        const userId = req.url.match(/\/users\/(\d+)\/hobbies/)[1];
        const user = usersData.find(u => u.id === parseInt(userId));
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ hobbies: user.hobbies }));
    } else if (req.url === '/users' && req.method === 'POST') {
    } else if (req.url.match(/\/users\/(\d+)/) && req.method === 'DELETE') {
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

export default server;
