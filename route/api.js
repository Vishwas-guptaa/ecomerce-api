const express = require("express");
const route = express.Router();
const ProductController = require("../controller/ProductController");
const UserController = require("../controller/UserController");
const CategoryController = require("../controller/CategoryController");


//user Route
route.post("/userinsert", UserController.userinsert);
route.post("/verifylogin", UserController.verifylogin);
route.get("/getUserDetail/:id",UserController.get_user_detail)
route.get("/getAllUser",UserController.get_all_user)
route.get("/logout",UserController.logout)
route.post("/updateProfile",UserController.updateprofile)
route.post("/updatePassword",UserController.updatepassword)

//product Route
route.post("/productinsert", ProductController.productinsert);
route.get("/productdisplay", ProductController.productdisplay);
route.delete("/productdelete/:id", ProductController.productDelete);
route.post("/productUpdate/:id", ProductController.productupdate);

// category Route
route.post("/categoryInsert", CategoryController.categoryinsert);
route.get("/categoryDisplay", CategoryController.categorydisplay);
route.delete("/categoryDelete/:id", CategoryController.categoryDelete);

module.exports = route;