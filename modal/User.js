const mongoose = require("mongoose");

//define schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
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
    password: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

//create collection
//users is the name of collection
//userschema is the field of blog collection
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
