/* globals require console */
"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    lowdb = require("lowdb"),
    cors = require("cors");

let db = lowdb("./data/data.json");
db._.mixin(require("underscore-db"));

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

require("./utils/authorize-user")(app, db);

//User routes
let usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);
// Categories
let categoriesController = require("./controllers/categories-controller")(db);
app.get("/api/categories", categoriesController.get);
app.get("/api/categories", categoriesController.post);
app.get("/api/categories", categoriesController.put);
//Products
let productsController = require("./controllers/products-controller")(db);
app.get("/api/products", productsController.get);
app.get("/api/products", productsController.post);
app.get("/api/products", productsController.put);
//Cart
let cartController = require("./controllers/cart-controller")(db);
app.get("/api/cart", cartController.get);
app.get("/api/cart", cartController.post);
app.get("/api/cart", cartController.put);

let port = 3333;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));