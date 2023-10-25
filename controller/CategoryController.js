const CategoryModel = require("../modal/Category");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "ddz1pswrm",
    api_key: "288465368246899",
    api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
    // secure: true
});

class CategoryController {
    static categoryinsert = async (req, res) => {
        try {
            //console.log(req.files)
            //console.log(req.body)
            const file = req.files.image;
            const myimages = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "EcomerceImage",
            });
            // console.log(myimage);

            // console.log(req.body);
            const { category_name } = req.body;
            const data = await new CategoryModel({
                category_name: category_name,
                image: {
                    public_id: myimages.public_id,
                    url: myimages.secure_url,
                },
            });

            await data.save();
            // console.log(data);
            res
                .status(201)
                .json({ status: "sucess", message: "Category Add Successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "failed",
                message: " Internal server error",
            });
        }
    };

    static categorydisplay = async (req, res) => {
        try {
            const data = await CategoryModel.find();
            res
                .status(201)
                .json({ status: "sucess", message: "Category Find Successfully",data });
        } catch (error) {
            res
                .status(201)
                .json({ status: "fail", message: "Internal server error" });
            console.log(error);
        }
    };

    static categoryView = async (req, res) => {
        try {
            const data = await CategoryModel.findById(req.params.id);
            res
                .status(201)
                .json({ status: "sucess", message: "Category Find Successfully",data });
        } catch (error) {
            res
                .status(201)
                .json({ status: "fail", message: "Internal server error" });
            console.log(error);
        }
    };

    static categoryDelete = async (req, res) => {
        try {
            const data = await CategoryModel.findByIdAndDelete(req.params.id);
            res.status(201).json({
                sucess: true,
                data,
                message: "category will be deleted",
            });
        } catch (error) {
            // console.log(error)
            res.status(501).json({
                sucess: false,
                error,
                message: "internal server error",
            });
        }
    };

    static productupdate = async (req, res) => {
        try {
            //console.log(req.body)
            //console.log(req.params.id)
            //delete image code
            const product = await ProductModel.findById(req.params.id);
            //console.log(product)
            const imageid = product.image.public_id;
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid);
            //update image
            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "EcomerceImage",
            });

            const {
                product_name,
                product_price,
                product_rating,
                product_stock,
                product_category,
                product_detail,
                product_discout_price,
            } = req.body;

            const productUpdate = await ProductModel.findByIdAndUpdate(
                req.params.id,
                {
                    product_name: product_name,
                    product_price: product_price,
                    product_rating: product_rating,
                    product_stock: product_stock,
                    product_category: product_category,
                    product_detail: product_detail,
                    product_discout_price: product_discout_price,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                }
            );
            await productUpdate.save();
            res
                .status(200)
                .json({ status: "sucess", message: "Product Update Successfully" });
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ status: "fail", message: "Internal Server Error" });
        }
    };
}
module.exports = CategoryController;
