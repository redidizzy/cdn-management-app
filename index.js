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
const MongoClient = require('mongodb').MongoClient ;
MongoClient.connect('mongodb://localhost:27017/CDN',(err, client) => {
    if(err) 
    {
        return console.error('not connected to mongo') ;
    }
app.use(express.urlencoded({extended:true})) ;
app.get('/' ,(req  ,res)=>{
  //trying to insert a new user 
  //error i get : MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms
 var admin =new user({userName :'nasser' ,password :'123'}) ;
 admin.save(function (err) {
  if(err) return console.error(err.stack)
  console.log("user is created")
      });
}) ;
}) ;
