const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DataBase Connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/Appointo`);
};
module.exports = connectDB;
