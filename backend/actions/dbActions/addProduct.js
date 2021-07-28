const mongoose =require('mongoose')
require('dotenv').config()


async function addProduct(name,stock,price,image,location)
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
  const productSchema = new mongoose.Schema(
    {
      productName:String,
      stock:String,
      price:Number,
      image:String,
      location:String,
      date:{type:Date,default:Date.now}

  
    }
  )

  // define the model
  const product=mongoose.model('product',productSchema)

  // add a document
  let tempProduct=new product(
    {
      productName:name,
      stock:stock,
      price:price,
      image:image,
      location:location
  
    }
  )

  await tempProduct.save()

  console.log('product saved')

  

}

module.exports=addProduct