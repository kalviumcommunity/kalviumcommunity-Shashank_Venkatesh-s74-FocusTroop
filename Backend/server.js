require("dotenv").config();
const http = require("http");
const express = require("express");
const cors =  require("cors")
const {Server} = require("socket.io");

const connectDB = require("./Database/db");
const app = require('./app');
const socketHandler = require("./Socket/SocketHandler");


const port = process.env.PORT;

//MONGODB CONNECTION CALLED
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO handler
socketHandler(io);



app.listen(port, () => {
    console.log(`Server running @ port ${port}`);
    console.log(`Socket.IO enabled`);
});
 