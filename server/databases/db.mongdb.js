const mongoose = require("mongoose");
const colors=require("colors")

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected to: ${connect.connection.host}`.bgMagenta);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
