const express = require('express')
const user = require('../Models/user')
const router =express.Router()
const resource = require('../Models/user')



// geting a user 
router.get('/', async(req,res)=>{
  try {
      const users =await user.find()
      res.send(users)
      
  } catch (error) {
      res.status(500).json({message :error.message})
  }

})
//creating a user
router.post('/register', async(req,res)=>{
    try {
        
        
    } catch (error) {
        
    }
})

//update
//delete
module.exports =router