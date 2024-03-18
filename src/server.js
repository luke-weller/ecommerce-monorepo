const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productsRoutes = require("./routes/products");

const port = process.env.DEV_PORT;

app.use(bodyParser.json());

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  const apiInfo = {
    name: "ecommerce api",
    version: "1.0.0",
    description: "This api provides REST API requests to an ecommerce project",
    endpoints: {
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

app.listen(port, () => {
  const serverURL = `http://localhost:${port}`;
  console.log(`Server listening on port ${port} - ${serverURL}\n`);
});
