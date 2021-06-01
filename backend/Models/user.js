const mongoose = require('mongoose')
const schema = mongoose.Schema
const resource  = require('./resource')
const UserSchema= new schema({
    userName: {
        type: String,
        required: true,
        index: { unique: true } 
    },
    password: {
        type: String,
        required: true 
    }
}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema) 

