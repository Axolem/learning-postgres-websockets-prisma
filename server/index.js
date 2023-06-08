// Express server with cors
const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors(), express.json());


const authRouter = require('./src/routes/auth');

app.use('/api/auth', authRouter);


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('text', (data) => {
        socket.broadcast.emit('text', data);
    });
    socket.on('disconnect', (data) => {
        console.log('user disconnected', data);
    });
})


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



