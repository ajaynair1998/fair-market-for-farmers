const mongoose = require("mongoose");
require("dotenv").config();

async function showAllProducts(productModel) {
  try {
    // Connect to Db
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //   query the db
    let products = await productModel.find({}).exec();

    return products;
  } catch (err) {
    return "error occured";
  }
}

module.exports = showAllProducts;
