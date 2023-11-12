const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')

const routes = require("./app/routes/index");

console.log("ENV: " + process.env.NODE_ENV);


app.use(cors())
app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV === "PRODUCTION") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(staticPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(staticPath + "/index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`RUNNING ON PORT: ${PORT}`);
});
