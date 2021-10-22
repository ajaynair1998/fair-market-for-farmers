const mongoose = require("mongoose");
require("dotenv").config();

async function addUser(userModel, name, salt, hash) {
  // Connect to Db
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // add a document
  let tempUser = new userModel({
    userName: name,
    salt: salt,
    hash: hash,
  });

  await tempUser.save();
  console.log("Successfully saved User");
}

module.exports = addUser;
