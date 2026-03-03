const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });

  await mongoose.connect(`${uri}/Appointo`);
};

module.exports = connectDB;
