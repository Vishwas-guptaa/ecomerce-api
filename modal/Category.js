const mongoose = require("mongoose");

//define schema
const CategorySchema = new mongoose.Schema(
  {
    category_name: {
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
  },

  { timestamps: true }
); 

//create collection
//users is the name of collection
//userschema is the field of blog collection
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
