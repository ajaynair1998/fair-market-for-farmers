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

    async addUser(name,salt,hash)
    {
        try
        {
        await this.connectionSuccessfull

         // add a document
        let tempUser=new userModel(
            {
            userName:name,
            salt:salt,
            hash:hash
        
            }
        )

        let user=await tempUser.save()

        console.log('Successfully saved User')

        return user

        }
        catch(err)
        {
            console.log(err)
            return false
        }
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

    async checkIfUserExistsAndReturnThem(name)
    {
        try
        {
            await this.connectionSuccessfull

            let query=await userModel.find({userName:name})

            return query


        }
        catch(err)
        {
            console.log(err)
        }
    }

    async checkIfUserExists(name)
    {
        try
        {

            await this.connectionSuccessfull

            let query=await userModel.find({userName:name})
            
            // returns true if user exists
            query.length > 0 ? true : false
            
        }
        catch(err)
        {

            console.log(err)

        }
    }

}
module.exports= MongoDbClass