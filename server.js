const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.DEV_PORT;

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  const serverURL = `http://localhost:${port}`;
  console.log(`Server listening on port ${port} - ${serverURL}\n`);
});
