const express = require('express')
const mongoose=require('mongoose')
const app = express()
const port = 3000

// For Mongo Db credentials
require('dotenv').config()

// Connect to Db
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }
)

// define new Schema
const userSchema = new mongoose.Schema(
  {
    userName:String,
    password:String

  }
)

// define the model
const user=mongoose.model('user',userSchema)

// add a document
let tempUser=new user(
  {
    userName:'ajaynair',
    password:'1234567'

  }
)
tempUser.save().then(()=>console.log('One entry Added'))






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


