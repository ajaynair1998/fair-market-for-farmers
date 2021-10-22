const mongoose = require("mongoose");

// define new Schema
let userSchema = new mongoose.Schema({
  userName: String,
  salt: String,
  hash: String,
  role: { type: String, default: null },
  mobileNumber: { type: String, default: null },
  DOB: { type: String, default: null },
  image: { type: String, default: null },
});
// define the model
let userModel = mongoose.model("user", userSchema);

module.exports = userModel;
