const ex = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const authUser = require("../middlewares/authUser");
const upload = require("../middlewares/multer");
const userRouter = ex.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

module.exports = userRouter;
