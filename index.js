const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const func = require("./functions.js");
const Numerologia = require("./Numerologia.js");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/numerology", function (req, res) {
  let request = req.body;
  let birthDate = new Date(request.date);
  let name = request.name.toUpperCase();
  let response = new Numerologia({ birthDate, name }).calculateNameDate();
  res.send(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
