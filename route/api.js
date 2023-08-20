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
route.get("/getUserDetail/:id",UserController.get_user_detail)
route.get("/getAllUser",UserController.get_all_user)
route.get("/logout",UserController.logout)
route.post("/updateProfile",UserController.updateprofile)
route.post("/updatePassword",UserController.updatepassword)
module.exports = route;