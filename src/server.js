require("dotenv").config();

const express = require("express");
const app = express();
const { Pool } = require("pg");

const port = process.env.DEV_PORT;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.get("/", (req, res) => {
  res.send("API working");
});

app.get("/products", (req, res) => {
  // Query the database to retrieve a list of products
  pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Database connection error" });
    } else {
      const productList = results.rows;
      res.status(200).json({ products: productList });
    }
  });
});

app.listen(port, () => {
  const serverURL = `http://localhost:${port}`;
  console.log(`Server listening on port ${port} - ${serverURL}\n`);
});
