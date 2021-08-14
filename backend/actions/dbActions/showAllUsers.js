const mongoose=require('mongoose')
require("dotenv").config(); 

async function showAllUsers(userModel)
{
    try{

    // Connect to Db
    mongoose.connect(
        process.env.MONGODB_URL,
        {
        useNewUrlParser:true,
        useUnifiedTopology:true
        }
    )

  
    //   query the db
    let users=await userModel.find({}).exec()
    return users

}
catch(err)
{
   
    return 'error occured'
    
}
}
  
module.exports =  showAllUsers
  