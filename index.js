const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.post('/GetNameDate', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body));
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});