const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (for frontend)
app.use(express.static("public"));

// When a client connects
io.on("connection", (socket) => {
  console.log("A user connected");

  // When a user joins a specific room
  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Listen for private chat messages
  socket.on("private message", (data) => {
    // Send message to the specific room (private chat)
    io.to(data.room).emit("private message", data.msg);
  });

  // When the user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
