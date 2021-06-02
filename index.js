const express = require('express')
const mongoose = require ('mongoose') ;
const app = express()
const port = 3000
const user =require('./backend/Models/user') ;

// Our routes


app.listen(port, () => {
  console.log(`CDN Management System app listening at http://localhost:${port}`)
})
//just a db connection and models testing code 
mongoose.connect('mongodb://localhost:27017/CDN', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.urlencoded({extended:true}))
app.get('/' , async (req  ,res)=>{
  //trying to insert a new user 
 var admin =new user({userName :'nasser' ,password :'123'})
 try{
   await admin.save()
 }catch(error){
   console.log(error)
 }
}) 
