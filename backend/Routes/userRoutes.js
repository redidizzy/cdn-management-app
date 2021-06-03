const express = require('express')
const user = require('../Models/user')
const router =express.Router()
const resource = require('../Models/user')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
const secretToken ='secret-token'

//registration
router.post('/register', async(req,res)=>{
    try {
        const password = await bcrypt.hash(req.body.password,10)
        const newUser = new user({
            userName: req.body.userName ,
            password: password
        })  
        const saveUser= newUser.save()
        res.status(201).json({token : generateToken(user)})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
//login 
router.post('/login',async(req,res)=>{
    try {
        const userFound = await user.findOne({userName:req.body.userName})
        if(!userFound){
            res.status(400).send({error:"no user with that username found"})
        }else{
            bcrypt.compare(req.body.password,userFound.password, (error,match)=>{
                if(match){
                 res.status(201).json({token : generateToken(userFound)})
                }else{
                 res.status(403).json({error:'password do not match'})
                }
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }

})



function generateToken(user){
    return jwt.sign({data :user},secretToken ,{expiresIn :'24h'})
}
module.exports =router