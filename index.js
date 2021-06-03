const express = require('express')
const mongoose = require ('mongoose') 
mongoose.set('useCreateIndex', true)
const app = express()
const port = 3000
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Our routes

app.listen(port, () => {
  console.log(`CDN Management System app listening at http://localhost:${port}`)
})
//db coneection 
mongoose.connect('mongodb://localhost:27017/CDN', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// handling authentification queries
const user =require('./backend/Routes/userRoutes') ;
app.use('/auth',user)

//handling resources requests
const resource =require('./backend/Routes/resourceRoutes') ;
app.use('/resource',resource)
