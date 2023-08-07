const express = require("express");
const bodyParser = require('body-parser')
const ViteExpress = require("vite-express");

const calculator = require('./integrals');

const app = express();
const jsonParser = bodyParser.json();

app.post("/midpoint", jsonParser, (req, res) => {
  console.log(req.body);
  calculator.calculateMidpoint(req.body.fx, req.body.a, req.body.b, req.body.n);
});

app.post("/trapezoid", jsonParser, (req, res) => {
  console.log(req.body);
  calculator.calculateTrapezoid(req.body.fx, 0, 0, 0)
});

app.post("/simpson", jsonParser, (req, res) => {
  console.log(req.body);
  calculator.calculateSimpson(req.body.fx, 0, 0, 0)
});

const port = 3000;
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
