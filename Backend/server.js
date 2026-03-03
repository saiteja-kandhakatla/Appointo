require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");
const adminRouter = require("./routes/adminRoute");
const doctorRouter = require("./routes/doctorRoute");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 1310;

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Appointo API is running" });
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
