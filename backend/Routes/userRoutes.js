const express = require('express')
const user = require('../Models/user')
const router =express.Router()
const resource = require('../Models/user')
const bcrypt =require('bcrypt')



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
        const password = await bcrypt.hash(req.body.password,10)
        const newUser = new user({
            userName: req.body.userName ,
            password: password
        })  
        const saveUser= await newUser.save()
        res.status(201).send(saveUser)
        
    } catch (error) {

        res.status(500).json({error: error.message})
    }
})

//update

//delete
module.exports =router