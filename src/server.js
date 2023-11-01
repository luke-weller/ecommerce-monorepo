const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Don't forget to require bodyParser
const productsRoutes = require("./routes/products"); // Import product routes

const port = process.env.DEV_PORT;

// Import database configuration from config/database.js
const pool = require("../config/database");

app.use(bodyParser.json());

// Use the product routes
app.use("/products", productsRoutes);

// Route for the API homepage
app.get("/", (req, res) => {
  const apiInfo = {
    name: "ecommerce api",
    version: "1.0.0",
    description: "This api provides REST API requests to an ecommerce project",
    endpoints: {
      // List of available endpoints and their descriptions
      "GET /products": "get a list of all products",
      "GET /products:id": "get a spesific product",
      "POST /products/": "post a new product to the database",
      "PUT /products/:id": "update a product in the database",
      "DELETE /products/:id": "delete a product from the database",
    },
    authentication:
      "How to authenticate with the API (e.g., API keys, OAuth, etc.)",
  };

  res.json(apiInfo);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(port, () => {
  const serverURL = `http://localhost:${port}`;
  console.log(`Server listening on port ${port} - ${serverURL}\n`);
});
