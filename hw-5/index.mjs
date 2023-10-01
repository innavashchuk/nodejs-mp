import http from 'http';
import usersRouter from './routes/users.mjs';
import hobbiesRouter from './routes/hobbies.mjs';
import usersData from './data/users.mjs';
import hobbiesData from './data/hobbies.mjs';

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/users')) {
        usersRouter(req, res, usersData, hobbiesData);
    } else if (req.url.startsWith('/hobbies')) {
        hobbiesRouter(req, res, hobbiesData);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});