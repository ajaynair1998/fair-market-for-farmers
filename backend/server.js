const express = require('express')
const app = express()
const port = 3000


// functions for mongodb
// Adding a User
const  addUser = require('./actions/dbActions/addUser')

// add  a new user to mongo db
addUser('ajaynairnew',123)





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


