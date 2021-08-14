let express=require('express')
let router =express.Router()

// importing mongoDb class for operations on db on each route
const MongoDbClass=require('../actions/dbActions/index')
const mongoDbOperations=new MongoDbClass()


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

// api to log in  -> in work
router.post('/loginPost',(req,res) =>
{

    res.json({reply:'acknowledged',
    name:req.body.username,
    password:req.body.password})

})


module.exports=router