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
//getting one resource 
router.get('/:id', async(req,res)=>{
    try {
        const resource= await resource.findOne({_id:req.params.id})
        if(resource){
            res.status(201).json(resource) 
        }else{
            res.status(400).json({error:'resource not found'})
        }     
    } catch (error) {
        res.status(500).json({message :error.message})
    }
  
  })
//update
//delete
module.exports =router