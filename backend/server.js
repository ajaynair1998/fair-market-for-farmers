const express = require('express')
const app = express()
const port = 3000


// functions for mongodb
// Adding a User
const  addUser = require('./actions/dbActions/addUser')
const addProduct=require('./actions/dbActions/addProduct')

// add  a new user to mongo db
addUser('ajaynairnew',123)
addProduct('something','2','2222','asdasd','123123')





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


