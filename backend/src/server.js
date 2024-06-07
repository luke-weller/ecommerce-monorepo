const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("../config/passport-config");
const bodyParser = require("body-parser");

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");

const app = express();
const port = process.env.DEV_PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

require("dotenv").config();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);

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
