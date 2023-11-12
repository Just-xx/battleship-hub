const { Server } = require("socket.io");

function configureSocket(server) {
  const ws = new Server(server);

  ws.on("connection", (socket) => {
    console.log("A user connected");

    // Handle events and communication here
    socket.on("message", (msg) => {
      ws.emit("message", "MSG"); // Broadcast the message to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = configureSocket;
