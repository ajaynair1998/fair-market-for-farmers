const mongoose=require('mongoose')
require("dotenv").config(); 

async function addUser(name,password)
{

// Connect to Db
mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser:true,
      useUnifiedTopology:true
    }
  )
  
  // define new Schema
  const userSchema = new mongoose.Schema(
    {
      userName:String,
      password:String
  
    }
  )
  
  // define the model
  const user=mongoose.model('user',userSchema)
  
  // add a document
  let tempUser=new user(
    {
      userName:name,
      password:password
  
    }
  )
  await tempUser.save()
  console.log('saved')
}
  
module.exports =  addUser
  