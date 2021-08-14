const express = require('express')
const cors=require('cors')
const app = express()
const passport = require('passport')
const port = 5000


// importing routes
let routes=require('./routes/index')


// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// Routes

app.use('/',routes)


app.listen(port, () => {
  console.log(`Fair Market  app listening at http://localhost:${port}`)
})


