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
router.get('/users', async (req, res) => {
  let users=await mongoDbOperations.showAllUsers()
  res.send({users:users})
})


// api to get all products
router.get('/products', async (req, res) => {
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



module.exports=router