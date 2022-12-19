const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const userController = {

  // register user
  registerUser: asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists!");
    }
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      pic,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token:generateToken(user._id)
      });
    } else {
      res.status(500);
      throw new Error("Error occured while registering!");
    }
  }),

  // login user
  loginUser: asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user) {
      const isMatched = await bcrypt.compare(password, user.password) 
      if(isMatched){
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token:generateToken(user._id)
        })
      } else {
        // wrong password
        res.status(400)
        throw new Error("Invalid Email or Password!")
      }
    } else {
      // email not found
      res.status(400)
      throw new Error("Invalid Email or Password!")
    }

  }),

  updateuserProfile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic

      if(req.body.password){
        user.password = req.body.password
      }
      const updatedUser = await user.save()
  
      res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        pic:updatedUser.pic,
        token:generateToken(updatedUser._id)
      })
    } else {
      res.status(404)
      throw new Error("User Not Found!")
    }
    
  }),

}; // last

module.exports = userController;
