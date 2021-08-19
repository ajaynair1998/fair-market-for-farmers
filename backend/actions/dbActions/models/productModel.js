const mongoose =require('mongoose')


// define new Schema
let productSchema=

new mongoose.Schema(
    {
      productName:String,
      smallDescription:String,
      detailedDescription:String,
      stock:String,
      price:Number,
      image:String,
      location:String,
      date:{type:Date,default:Date.now},
      userReference:{type:String,default:'no user id attached'}

  
    }
  )

  // define the model
  const productModel=mongoose.model('product',productSchema)

 

  



module.exports=productModel