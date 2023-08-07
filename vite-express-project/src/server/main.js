const express = require("express");
const bodyParser = require('body-parser')
const ViteExpress = require("vite-express");

const calculator = require('./integrals');

const app = express();
const jsonParser = bodyParser.json();

app.post("/midpoint", jsonParser, (req, res) => {
  const solution = calculator.calculateMidpoint(req.body.fx, parseFloat(req.body.a), parseFloat(req.body.b), parseInt(req.body.n));
  res.send({ solution: solution });
});

app.post("/trapezoid", jsonParser, (req, res) => {
  const solution = calculator.calculateTrapezoid(req.body.fx, parseFloat(req.body.a), parseFloat(req.body.b), parseInt(req.body.n));
  res.send({ solution: solution });
});

app.post("/simpson", jsonParser, (req, res) => {
  const solution = calculator.calculateSimpson(req.body.fx, parseFloat(req.body.a), parseFloat(req.body.b), parseInt(req.body.n));
  res.send({ solution: solution });
});

const port = 3000;
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
