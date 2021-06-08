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
const fetch = require('node-fetch')
const jwt =require('jsonwebtoken')
//using local storage for jwt
const {LocalStorage} =require('node-localstorage')
var localStorage = new LocalStorage('./scratch');


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
  //login routes
  app.get('/login' , async (req  ,res)=>{
    const token =localStorage.getItem('jwt')
    if (token=="undefined") {
      res.render('pages/login')
    } else {
      jwt.verify(token ,'secret-token', (error)=>{
        if (!error) {
          res.render('pages/dashboard') 
        } else {
          res.render('pages/login',{error: error.message})
        }
      })
    }
    
  }) 
  app.post('/authenticate' , async (req ,res)=>{
    let response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        userName: req.body.userName ,
        password: req.body.password
      })
    })
   const data = await response.json()
    if(data.token){
      jwt.verify(data.token ,'secret-token', (error)=>{
        if (!error) {
          localStorage.setItem('jwt', data.token)
          res.render('pages/dashboard')
        } else {
          res.render('pages/login',{error: error.message})
        }
      
      })
    }else{
      res.render('pages/login',{error: data.error})
    }
  })
  //logout
  app.get('/logout',async(req,res)=>{
    localStorage.clear()
    res.render('pages/login')
  })
  // 
  app.listen(port, () => {
    console.log(`CDN Management System app listening at http://localhost:${port}`)
  })

  // handling authentification queries
const user =require('./backend/Routes/userRoutes') ;
app.use('/auth',user)

//handling resources requests
const resource =require('./backend/Routes/resourceRoutes') ;
const { JsonWebTokenError } = require('jsonwebtoken')
app.use('/resource',resource)

