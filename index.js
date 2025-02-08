const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Numerologia = require("./Numerologia.js");
const path = require("path");
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

// CORS Configuration
const whitelist = [
  'http://localhost:1490',
  'http://localhost:3000',
  process.env.PRODUCTION_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.error('CORS blocked request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors(corsOptions));

// API Routes (must come before static files)
app.post("/api/numerology", function (req, res) {
  try {
    logger.info('Processing numerology calculation', { body: req.body });
    let request = req.body;
    
    if (!request || !request.date || !request.name) {
      logger.error('Validation failed', { body: req.body });
      throw new Error('Missing required fields: date and name are required');
    }

    let birthDate = new Date(request.date);
    let name = request.name.toString().toUpperCase();
    
    let response = new Numerologia({ birthDate, name }).calculateNameDate();
    logger.info('Calculation successful', { response });
    res.status(200).send(response);
  } catch (error) {
    logger.error('Calculation failed', { error });
    res.status(400).send({
      error: error.message || 'Failed to process numerology calculation',
      timestamp: new Date().toISOString()
    });
  }
});

// Static file serving
app.use(express.static(path.join(__dirname, "public")));

// Page routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "result.html"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
