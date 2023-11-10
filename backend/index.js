const path = require("path")
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "PRODUCTION") {
    const staticPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(staticPath));
    app.get('*', (req, res) => res.sendFile(path.join(staticPath + '/index.html')))
}

app.get('/api', (req, res) => {
    res.json({ msg: "asasa" })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});