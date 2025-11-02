const ex = require("express");
const { doctorList } = require("../controllers/doctorController");

const doctorRouter = ex.Router();

doctorRouter.get("/list", doctorList);

module.exports = doctorRouter;
