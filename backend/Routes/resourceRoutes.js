const express = require('express')
const router =express.Router()
const resource = require('../Models/resource')



// geting all resources  
router.get('/', async(req,res)=>{
  try {
      const resources= await resource.find()
      res.status(201).json(resources) 
      
  } catch (error) {
      res.status(500).json({message :error.message})
  }

})
//update
//delete
module.exports =router