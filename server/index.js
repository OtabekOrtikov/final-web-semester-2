const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const schedule = require("./schedule.json");
const gallery = require("./gallery.json");

app.get("/schedule", (req, res) => {
  res.json(schedule);
});

app.get("/gallery", (req, res) => {
  res.json(gallery);
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Dance Studio by Otabek</h1>
    <p>Availabe endpoints:</p>
    <ul>
        <li><a href="http://127.0.0.1:${port}/schedule">/schedule</a></li>
        <li><a href="http://127.0.0.1:${port}/gallery">/gallery</a></li>
    </ul>`);
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}/`);
});
