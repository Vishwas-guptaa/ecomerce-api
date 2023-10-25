const mongoose = require("mongoose");

//define schema
const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_rating: {
      type: String,
      require: true,
    },
    product_stock:{
      type: String,
      require: true,
    },
    product_category:{
      type: String,
      require: true,
    },
    product_detail:{
      type: String,
      require: true,
    
    },
    product_discout_price:{
      type: String,
      require: true,
    }
  },

  { timestamps: true }
);

//create collection
//users is the name of collection
//userschema is the field of blog collection
const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
