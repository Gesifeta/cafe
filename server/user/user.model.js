const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  mobile: { type: String, required: [true, "mobile number is required"] },
  email: { type: String, required: [true, "email address is required"] },
  password: { type: String, required: [true, "password is required"] },
  isAdmin: { type: Boolean, default: false },
  status: { type: String },
});

module.exports = mongoose.model("Users", userSchema);
