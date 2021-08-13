const mongoose=require('mongoose')
const productModel=require('./models/productModel')
const userModel=require('./models/userModel')

require("dotenv").config(); 


class MongoDbClass{
    constructor()
    {
        // On initialisation
        // Connect to Db
        this.connectionSuccessfull=mongoose.connect(
            process.env.MONGODB_URL,
            {
            useNewUrlParser:true,
            useUnifiedTopology:true
            }
        )
    }

    async addUser(name,password)
    {
        await this.connectionSuccessfull

         // add a document
        let tempUser=new userModel(
            {
            userName:name,
            password:password
        
            }
        )

        await tempUser.save()
        console.log('Successfully saved User')
    }

    async addProduct(name,stock,price,image,location)
    {

        await this.connectionSuccessfull

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


    async showAllProducts()
    {
        try
        {
        await this.connectionSuccessfull

         //   query the db
        let products=await productModel.find({}).exec()
      
  
        return products
        }
        catch(err)
        {
            if(err)
            {
                console.log(err)
            }
        }

    }

    async showAllUsers()
    {   
    try
    {
        await this.connectionSuccessfull
        //   query the db
        let users=await userModel.find({}).exec()
        return users
    }
    catch(err)
    {

        return 'error occured recieving users'
    }
    }

}
module.exports= MongoDbClass