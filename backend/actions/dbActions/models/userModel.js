const mongoose=require('mongoose')

// define new Schema
let userSchema=

new mongoose.Schema(
    {
      userName:String,
      salt:String,
      hash:String
  
    }
  )
// define the model
let userModel=mongoose.model('user',userSchema)

  
module.exports =  userModel
  