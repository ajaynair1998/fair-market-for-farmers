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
router.post('/registerPost',async (req,res) =>
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
router.post('/loginPost',async (req,res) =>
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
// passport.authenticate('jwt',{session:false}),
// get the dashboard of the current user
router.get('/dashboard',async (req,res) =>
{
  try
  {
    let token=req.header("Authorization")

    let userName=await verifyAndRetrieveUser(token)

    res.json({success:true,msg:'you are authorised',user:"Ajay"})
  }
  catch(err)
  {
    res.json({success:false,msg:'you are not authorised'})
  }
})

module.exports=router