const express = require('express')
const app = express()
const port = 3000


// functions for mongodb

// All Models
// Define the model IN SINGULAR  ex :'user' -> Collection of users will be created
const userModel= require('./actions/dbActions/models/userModel')
const productModel=require('./actions/dbActions/models/productModel')


// import mongodb actions (to do these actions pass in the models each time)
const  addUser = require('./actions/dbActions/addUser')
const addProduct=require('./actions/dbActions/addProduct')
const showAllUsers=require('./actions/dbActions/showAllUsers')
const showAllProducts=require('./actions/dbActions/showAllProducts')


// debug actions
// addUser(userModel,'aja',123)
// addProduct(productModel,'somet','2','22222','asdasd','123123')







// Routes

app.get('/users', async (req, res) => {
  let users=await showAllUsers(userModel)
  res.send({users:users})
})

app.get('/products', async (req, res) => {
  let products=await showAllProducts(productModel)
  res.send({products:products})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


