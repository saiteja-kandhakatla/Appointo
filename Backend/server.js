const dotenv = require("dotenv");
dotenv.config();
const exp = require("express");
const cors = require("cors");
// import connectDB from "./config/mongodb";
const connectCloudinary = require("./config/cloudinary");

// app config
const app = exp();
const port = process.env.PORT || 1310;
const connectDB = require("./config/mongodb");
const adminRouter = require("./routes/adminRoute");
const doctorRouter = require("./routes/doctorRoute");
const userRouter = require("./routes/userRoute");

// connections
connectDB();
connectCloudinary();

// middlewares
app.use(exp.json());
app.use(cors());

// api end points
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server started ", port);
});
