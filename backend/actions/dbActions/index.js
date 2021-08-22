const mongoose=require('mongoose')
const productModel=require('./models/productModel')
const userModel=require('./models/userModel')
const transactionModel=require('./models/transactionModel')

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

    async showAllTransactions()
    {
        try
        {
            await this.connectionSuccessfull

            // query the db
            let transactions=await transactionModel.find({}).exec()
            return transactions
        }
        catch(err)
        {
            console.log(err)
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
    async getProfileDetailsOfTheUser(key,field="userName")
    {
        try{
        await this.connectionSuccessfull

        let query=await userModel.find({[field]:key},{salt:0,hash:0,_id:0,__v:0})

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

    // add a product by a user
    async addProductByUser(userName,productObject)
    {
        try
        {
            // add
            await this.connectionSuccessfull
            
            // Make a temporary products by the product model
            let tempProduct=new productModel( productObject )

            // now save this product in the products collection
            await tempProduct.save()

            return true

        }
        catch(err)
        {
            console.log(err)
        }
    }

    // get the details of the product the buyer wishes to see
    async retrieveProductDetails(key,field='_id')
    {
        try
        {
            await this.connectionSuccessfull

            let query=await productModel.find({[field]:key})

            return query[0]

        }

        catch(err)
        {
            console.log(err)
        }
    }

    // make A transaction by a User
    // --> buying a specific amount of stock by a buyer from a farmer
    async makeTransactionByBuyer(buyer,stockBought,productObject)
    {
        try
        {
        await this.connectionSuccessfull

        // then add the current transaction into the transactions collection
        let tempTransaction=new transactionModel({...productObject,buyer:buyer,stockBought:stockBought})

        // now save tis transaction
        await tempTransaction.save()

        return true
        }

        catch(err)
        {

            console.log(err)
            
        }
    }






            



}
module.exports= MongoDbClass