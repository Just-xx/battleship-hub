import path from "path";
import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { configureSocket } from "./app/sockets/socketHandler.js";
import routes from './app/routes/index.js'

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

configureSocket(server);

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
