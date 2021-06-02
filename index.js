const express = require('express')
const staticFolder = './frontend/assets'
const mongoose = require ('mongoose') ;
const app = express()
const port = 3000
const user =require('./backend/Models/user') ;
var expressLayouts = require('express-ejs-layouts');
const path = require('path');


// Our routes

app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', './frontend/views')
app.set('layout', 'layout');



//just a db connection and models testing code 
mongoose.connect('mongodb://localhost:27017/CDN', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, staticFolder)));

app.get('/' , async (req  ,res)=>{
  res.render('pages/dashboard')
}) 
app.listen(port, () => {
  console.log(`CDN Management System app listening at http://localhost:${port}`)
})