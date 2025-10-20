const express = require("express");
const { addDoctor, loginAdmin } = require("../controllers/adminController");
const upload = require("../middlewares/multer"); // <-- correct import
const authAdmin = require("../middlewares/authAdmin");

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);

// admin login
module.exports = adminRouter;
