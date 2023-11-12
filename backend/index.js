const path = require("path");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const PORT = process.env.PORT || 3000;

const configureSocket = require("./app/sockets/socketHandler");
const routes = require("./app/routes/index");

const app = express();
const server = createServer(app);

configureSocket(server)

if (process.env.NODE_ENV === "DEVELOPMENT") app.use(cors());
app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV === "PRODUCTION") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(staticPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(staticPath + "/index.html"))
  );
}

server.listen(PORT, () => {
  console.log("ENV: " + process.env.NODE_ENV);
  console.log(`RUNNING ON PORT: ${PORT}`);
});
