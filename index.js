const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const func = require("./functions.js");
const Numerologia = require("./Numerologia.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.post("/getNameDate", function (req, res) {
  let request = req.body;
  let birthDate = new Date(request.date);
  let name = request.name.toUpperCase();
  console.log(name);
  let response = new Numerologia({ birthDate, name }).calculateNameDate();
  res.send(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
