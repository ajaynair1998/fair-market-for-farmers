const mongoose =require('mongoose')
require('dotenv').config()




async function addProduct(productModel,name,stock,price,image,location)
{
    // Connect to Db
    mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser:true,
      useUnifiedTopology:true
    }
  )
    
  


  // add a document
  let tempProduct=new productModel(
    {
      productName:name,
      stock:stock,
      price:price,
      image:image,
      location:location,
      
  
    }
  )

  await tempProduct.save((err,userDoc) =>
  {
      if(err)
      {
          console.log(err)
      }
      else
      {
          console.log('successfully saved product')
      }
  })

  

  

}

module.exports=addProduct