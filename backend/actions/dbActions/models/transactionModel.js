const mongoose =require('mongoose')


// define new Schema
let transactionSchema=

// The transaction will be same as the product but there will be some added parameters
// ----> buyer,date of transaction,stockBought
new mongoose.Schema(
    {
      buyer:String,
      dateOfTransaction:{type:Date,default:Date.now},
      stockBought:String,

      productName:String,
      smallDescription:String,
      detailedDescription:String,
      stock:String,
      price:Number,
      image:String,
      location:String,
      date:{type:Date},
      userReference:{type:String,default:'no user id attached'}

  
    }
  )

  // define the model
  const transactionModel=mongoose.model('transaction',transactionSchema)

 

  



module.exports=transactionModel