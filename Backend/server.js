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

// connections
connectDB();
connectCloudinary();

// middlewares
app.use(exp.json());
app.use(cors());

// api end points
app.use("/api/admin", adminRouter); // <--- Request processed here
// Add a test middleware here
app.use((req, res, next) => {
  console.log("Request hit server."); // <--- This is only hit if a route *after* adminRouter matches, or if no route matches.
  next();
});

app.get("/", (req, res) => {
  res.send("API Working correctly");
});
app.listen(port, () => {
  console.log("Server started ", port);
});
