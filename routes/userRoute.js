const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")
const {protect} = require("../middlewares/authMiddleware")

userRouter.post("/", userController.registerUser)
userRouter.post("/login", userController.loginUser)
userRouter.post("/profile", protect, userController.updateuserProfile)


module.exports = userRouter 