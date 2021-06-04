const express = require('express')
const mongoose = require ('mongoose') 
mongoose.set('useCreateIndex', true)
const app = express()
const port = 3000
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const staticFolder = './frontend/assets'
var expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Our routes

app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', './frontend/views')
app.set('layout', 'layout');

//db connection
mongoose.connect('mongodb://localhost:27017/CDN', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, staticFolder)));

app.get('/' , async (req  ,res)=>{
    res.render('pages/dashboard')
  }) 
  app.listen(port, () => {
    console.log(`CDN Management System app listening at http://localhost:${port}`)
  })

  // handling authentification queries
const user =require('./backend/Routes/userRoutes') ;
app.use('/auth',user)

//handling resources requests
const resource =require('./backend/Routes/resourceRoutes') ;
app.use('/resource',resource)

