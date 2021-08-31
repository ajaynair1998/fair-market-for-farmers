const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000



// importing routes
let routes = require('./routes/index')



// middlewares

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(cors({ origin: '*' }))






// Routes

app.use('/', routes)


app.listen(port, () =>
{
  console.log(`Fair Market  app listening at http://localhost:${port}`)
})


