let express=require('express')
let router =express.Router()
const passport=require('passport')
const verifyAndRetrieveUser=require('../actions/crypto/authentication/protected')

// importing mongoDb class for operations on db on each route
const MongoDbClass=require('../actions/dbActions/index')
const mongoDbOperations=new MongoDbClass()


// authentication functions
const register=require('../actions/crypto/authentication/register')
const login=require('../actions/crypto/authentication/login')





// api to get all users
router.get('/usersDebug', async (req, res) => {
  let users=await mongoDbOperations.showAllUsers()
  res.send({users:users})
})


// api to get all products
router.get('/productsDebug', async (req, res) => {
  let products=await mongoDbOperations.showAllProducts()
  res.send({products:products})
})

// api to register a user  -> in work
router.post('/register',async (req,res) =>
{
  try
  {
    let response = await register(req.body.username,req.body.password)
    
    res.json({reply:response})
    
  }
  catch(err)
  {

    console.log(err)

  }
})


// api to log in
router.post('/login',async (req,res) =>
{
  try
  {
    
    let response=await login(req.body.username,req.body.password)

   
    res.json(response)
  

    
  }
  catch(err)
  {
    console.log(err)
  }
})

// Get further details after registering
// (ie getting the user authentication token)
router.get('/profile',async (req,res) =>
{
  try
  {
    let token=req.header("Authorization")

    let userName=await verifyAndRetrieveUser(token)

    // if not authorised
    if(!userName)res.status(404).json({success:false,msg:"you are unauthorised"})

    // if authorised
    let userDetails=await mongoDbOperations.getProfileDetailsOfTheUser(userName)
    res.status(200).json({success:true,details:userDetails})

    
  }
  catch(err)
  {
    console.log(err)
  }
}
)

// post after editing profile
router.post('/profile',async (req,res) =>
{
  try
  {
    let token=req.header("Authorization")

    let userName=await verifyAndRetrieveUser(token)
    // if not authorised
    if(!userName)res.status(404).json({success:false,msg:"you are unauthorised"})

    // if authorised
    let successfullyEdited=await mongoDbOperations.editProfileDetailsOfTheUser(userName,req.body)

    if(successfullyEdited)res.status(200).json({success:true,msg:"successfully Edited"})
    res.status(400).json({success:false,msg:"Something went wrong"})

  }
  catch(err)
  {

  }
})


// get the dashboard of the current user
// more to do after creating products done
router.get('/dashboard',async (req,res) =>
{
  try
  {
    let token=req.header("Authorization")

    let userName=await verifyAndRetrieveUser(token)

    // if not authorised
    if(!userName)res.status(404).json({success:false,msg:"you are unauthorised"})

    // if authorised
    res.status(200).json({success:true,msg:'you are authorised',user:userName})
  }
  catch(err)
  {
    res.json({success:false,msg:'you are not authorised'})
  }
})

// Get the details of a product
router.post('/productDetails',async(req,res)=>
{
  try
  {
    // authorisation
    let token=req.header("Authorization")
    let userName=await verifyAndRetrieveUser(token)

    if(!userName)
    {
      res.status(401).json({success:false,msg:"You are unauthorised"})
    }
    else
    {
      if(!req.body.productId)
      {
        res.status(400).json({success:false,msg:"No product Id Found"})
      }
      else
      {
        let productDetails=await mongoDbOperations.retrieveProductDetails(req.body.productId)

        // if the product is found
        if(productDetails)
        {
          res.status(200).json({success:true,product:productDetails})
        }
        // if the product by the given id is not found
        else
        {
          res.status(500).json({success:false,msg:"No product found"})
        }
      }
    }
    

  }
  catch(err)
  {
    console.log(err)
  }

})















router.post('/product',async (req,res) => 
{
  try
  {
    let token=req.header("Authorization")

    let userName=await verifyAndRetrieveUser(token)

    // if not authorized then return unauthorised status 404
    if(!userName || !req.body.product)res.status(404).json({success:false,msg:"You are not Authorized"})

    // if authorized
    // then add the product to products database and reutnr status ok
    req.body.product.userReference = userName ;
    let productAddedSuccessfully=await mongoDbOperations.addProductByUser(userName,req.body.product)
    if(productAddedSuccessfully)res.status(200).json({success:true,msg:"Product added successfully"})
    else res.status(500).json({success:false,msg:"could not add the product"})

  }
  catch(err)
  {

  }
})

// buy a product ie; a transaction
// we need the buyer name and the stock bought
router.post('/buy',async (req,res)=>
{
  try
  {
    // extract token from request
      let token =req.header('Authorization')

      let userName=await verifyAndRetrieveUser(token)

      // if not authorized
      if(!userName || !req.body.product)res.status(404).json({success:false,msg:"You are not Authorized"})

      // if request not correct then return bad request
      if(!req.body.product || !req.body.stock)res.status(400).json({success:false,msg:"Bad Request"})

      // if authorised and there is a valid request
      let transaction=await mongoDbOperations.makeTransactionByBuyer(userName,req.body.stock,req.body.product)

      // if the transaction was successfull
      if(transaction)res.status(200).json({success:true,msg:"Transaction Done Successfully"})

      // if the transaction failed
      else res.status(500).json({success:false,msg:"Failed Transaction"})
  }
  catch(err)
  {
    console.log(err)
  }
})



module.exports=router