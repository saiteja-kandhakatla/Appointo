const express = require("express");
const {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
} = require("../controllers/adminController");
const upload = require("../middlewares/multer"); // <-- correct import
const authAdmin = require("../middlewares/authAdmin");
const { changeAvailablity } = require("../controllers/doctorController");

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);

// admin login
module.exports = adminRouter;
