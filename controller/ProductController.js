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
      const { product_name, product_price, product_rating,
        product_stock,product_category, product_detail,
        product_discout_price} = req.body;

      const data = await new ProductModel({
        product_name: product_name,
        product_price: product_price,
        product_rating: product_rating,
        product_stock:product_stock,
        product_category:product_category,
        product_detail:product_detail,
        product_discout_price:product_discout_price,
        image: {
          public_id: myimages.public_id,
          url: myimages.secure_url,
        },
      });

      await data.save();
      // console.log(data);
      res
        .status(201)
        .json({ status: "sucess", message: "Product Add Successfully" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "failed",
        message: "Product failed",
      });
    }
  };

  static productdisplay = async (req, res) => {
    try {
      const data = await ProductModel.find();
      res.status(201).json({
        status: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",message:"internal server error"
    })
      //console.log(error);
    }
  };


  static productview = async (req, res) => {
    try {
      const productDetail = await ProductModel.findById(req.params.id);
      res.status(201).json({
        status: true,
       productDetail
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",message:"internal server error"
    })
        
      //console.log(error);
    }
  };


  static productDelete =async(req,res)=>{
    try{
       const data = await ProductModel.findByIdAndDelete(req.params.id)
       res.status(201).json({
        sucess:true,data,message:'product will be deleted'
       })
    }catch(error){
     // console.log(error)
      res.status(501).json({
        sucess:"false",message:'internal server error'
       })
    }
  }

  static productupdate = async(req, res)=>{
    try{
       //console.log(req.body)
        //console.log(req.params.id)
          //delete image code
          const product = await ProductModel.findById(req.params.id)
          //console.log(product)
          const imageid = product.image.public_id
           //console.log(imageid)
           await cloudinary.uploader.destroy(imageid)
            //update image
           const file = req.files.image;
           const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
             folder: "EcomerceImage",
           });

           const { product_name, product_price, product_rating,
            product_stock,product_category, product_detail,
            product_discout_price} = req.body;

      const productUpdate = await ProductModel.findByIdAndUpdate(req.params.id,{

         product_name: product_name,
        product_price: product_price,
        product_rating: product_rating,
        product_stock:product_stock,
        product_category:product_category,
        product_detail:product_detail,
        product_discout_price:product_discout_price,
        image:{
          public_id:myimage.public_id,
          url:myimage.secure_url
        }
      })   
      await productUpdate.save()
      res .status(200).json({ status: "sucess", message: "Product Update Successfully" });
    }catch(error){
      console.log(error)
      res .status(500).json({ status: "fail", message: "Internal Server Error" });
    }

  }





}
module.exports = ProductController;
