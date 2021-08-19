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

    async checkIfUserExistsAndReturnThem(name,field='userName')
    {
        try
        {
            await this.connectionSuccessfull

            let query=await userModel.find({[field]:name})
            
            return query[0]


        }
        catch(err)
        {
            console.log(err)
        }
    }

    // by default checks if username exists
    async checkIfUserExists(name,field='userName')
    {
        try
        {

            await this.connectionSuccessfull

            let query=await userModel.find({[field]:name})
            
            // console.log(query)

            // returns true if user exists
            return query.length > 0 ? true : false

        }
        catch(err)
        {

            console.log(err)

        }
    }

    // check for a user by object id
    async checkByObjectIdAndReturn(id)
    {
        try
        {
            await this.connectionSuccessfull

            let query=await userModel.findById({'_id':id})
            // console.log(query)
            return query

        }
        catch(err)
        {
            console.log(err)
        }
    }

    // get all the details of the user
    async getProfileDetailsOfTheUser(id,field="userName")
    {
        try{
        await this.connectionSuccessfull

        let query=await userModel.find({[field]:id},{salt:0,hash:0,_id:0,__v:0})

        return query[0]
        }
        catch(err)
        {
            console.log(err)
        }
    }

    // edit the profile of the user
    async editProfileDetailsOfTheUser(id,newDetails)
    {
        try
        {
            await this.connectionSuccessfull

            let filter={userName:id}


            // TO MAKE SURE NO PRIMARY FIELD ARE PASSED INTO NEW DETAILS
            // FILTER THEM OUT

            let query =await userModel.findOneAndUpdate(filter,newDetails,
                {
                    new:true
                })
            
            // return true if operation successfull
            if(!query)return false
            return true
            
        }
        catch(err)
        {
            console.log(err)
        }
    }




            



}
module.exports= MongoDbClass