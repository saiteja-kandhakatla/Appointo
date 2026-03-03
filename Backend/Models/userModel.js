const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },
    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000000" },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
