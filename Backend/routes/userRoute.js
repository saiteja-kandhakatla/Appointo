const ex = require("express");
const { registerUser } = require("../controllers/userController");
const userRouter = ex.Router();

userRouter.post("/register-user", registerUser);


module.exports=userRouter