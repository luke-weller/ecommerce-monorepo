const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const session = require("express-session");

const port = process.env.DEV_PORT;

const pool = require("../config/database");

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const query = "SELECT * FROM users WHERE email = $1";
        const { rows } = await pool.query(query, [email]);

        if (rows.length === 0) {
          return done(null, false, { message: "User not found" });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRoutes);
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
