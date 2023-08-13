const express = require("express");
const route = express.Router();
const ProductController = require("../controller/ProductController");
const UserController = require("../controller/UserController");

//product controller
route.post("/productinsert", ProductController.productinsert);
route.get("/productdisplay", ProductController.productdisplay);
//user insert
route.post("/userinsert", UserController.userinsert);
route.post("/verifylogin", UserController.verifylogin);

module.exports = route;
