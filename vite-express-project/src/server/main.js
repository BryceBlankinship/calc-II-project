const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

const port = 3001;
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
