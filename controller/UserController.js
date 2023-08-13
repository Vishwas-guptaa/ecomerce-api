const UserModel = require("../modal/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddz1pswrm",
  api_key: "288465368246899",
  api_secret: "Zq5bXS-SVjDGmijXiRY4ohoXZ_c",
  // secure: true
});

class UserController {
  static userinsert = async (req, res) => {
    try {
      //console.log(req.files)
      //console.log(req.body)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "AdmissionImage",
      });
      //console.log(myimage)
      //
      //     const file =req.files.image
      //     const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
      //     folder:'AdmissionImage'
      //     })

      //     // console.log(req.body)
      const { name, email, password, confirmpassword, mobile } = req.body;

      const user = await UserModel.findOne({ email: email });
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "This email is already exits" });
      } else {
        if (name && email && password && confirmpassword) {
          if (password && confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = await new UserModel({
              name: name,
              email: email,
              mobile: mobile,
              password: hashpassword,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
            });

            await result.save();
            res
              .status(201)
              .json({ status: "sucess", message: "Registration Successfully" });
          } else {
            res.status(401).json({
              status: "failed",
              message: "Password and confirm password does not match",
            });
          }
        } else {
          res
            .status(201)
            .json({ status: "failed", message: "All field require" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      //console.log(req.body)

      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user)
        if (user != null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            const token = jwt.sign({ ID: user._id }, "shivanibansal@123#8962");
            res.cookie("token", token);
            res.status(200).json({
              status: "Success",
              message: "Login Successfully",
              token,
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "Email password is not valid",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "You are not register user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "All field are required" });
      }
    } catch (error) {
      console.log("error");
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static updateprofile = async (req, res) => {
    try {
      // console.log("rrrrr");
      if (req.files) {
        const user = await UserModel.findById(req.user.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "AdmissionImage",
        });

        var data = {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
        };
      }
      console.log(data);
      const updateprofile = await UserModel.findByIdAndUpdate(
        req.user.id,
        data
      );
      res.redirect("/profiledashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static updatepassword = async (req, res) => {
    try {
      //console.log("hello");
      const { old_password, new_password, cpassword } = req.body;
      //console.log(req.body);
      //const { _id } = req.admin;

      // console.log(_id)

      if (old_password && new_password && cpassword) {
        const user = await UserModel.findById(req.user.id);
        //console.log(admin)
        const ismatched = await bcrypt.compare(old_password, user.password);
        // const isPasswordMatched = await userModel.comparePassword(req.body.old_password);
        if (!ismatched) {
          req.flash("error", "Old password is incorrect");
          res.redirect("/changepass");
        } else {
          if (new_password !== cpassword) {
            req.flash("error", "Paswword not Match");
            res.redirect("/changepass");
          } else {
            const newHashPassword = await bcrypt.hash(new_password, 10);
            //console.log(req.user)
            await UserModel.findByIdAndUpdate(req.user.id, {
              $set: { password: newHashPassword },
            });

            req.flash("error", "Password changed succesfully");
            res.redirect("/logout");
          }
        }
      } else {
        req.flash("error", "All Fields are Required");
        res.redirect("/changepass");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
