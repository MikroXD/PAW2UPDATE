const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      // ambil drivers di mongodb.com
      "mongodb+srv://Ugrasena:Kipasangin253@cluster0.pf3m7co.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
