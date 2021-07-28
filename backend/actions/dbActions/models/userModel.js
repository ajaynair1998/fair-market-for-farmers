const mongoose=require('mongoose')

// define new Schema
let userSchema=



  
  
   new mongoose.Schema(
    {
      userName:String,
      password:String
  
    }
  )
// define the model
let userModel=mongoose.model('user',userSchema)

  
module.exports =  userModel
  