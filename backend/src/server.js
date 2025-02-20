const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/v1');
const config = require("./config/config");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

mongoose.connect(`${config.mongoose.url}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// WebSocket setup
io.on('connection', (socket) => {
  console.log('Client connected');
});

app.use('/v1', apiRoutes);

const PORT = config.port || 8082;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };
