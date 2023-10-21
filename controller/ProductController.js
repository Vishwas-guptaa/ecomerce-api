const ProductModel = require("../modal/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
});

class ProductController {
  static productinsert = async (req, res) => {
    try {
      //console.log(req.files)
      //console.log(req.body)
      const file = req.files.image;
      const myimages = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "EcomerceImage",
      });
      // console.log(myimage);

      // console.log(req.body);
      const { product_name, product_price, product_rating } = req.body;

      const result = await new ProductModel({
        product_name: product_name,
        product_price: product_price,
        product_rating: product_rating,
        image: {
          public_id: myimages.public_id,
          url: myimages.secure_url,
        },
      });

      await result.save();
      // console.log(result);
      res
        .status(201)
        .json({ status: "sucess", message: "Registration Successfully" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "failed",
        message: "registration failed",
      });
    }
  };

  static productdisplay = async (req, res) => {
    try {
      const result = await ProductModel.find();
      res.status(201).json({
        status: true,
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static productDelete =async(req,res)=>{
    try{

       const result = await ProductModel.findByIdAndDelete(req.params.id)

       
       res.status(201).json({
        sucess:true,result,message:'product will be deleted'
       })
    }catch(error){
      console.log(error)

      res.status(501).json({
        sucess:false,result:error,message:'internal server error'
       })
    }
  }
}
module.exports = ProductController;
