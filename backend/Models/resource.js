const mongoose = require('mongoose') ;
const schema = mongoose.Schema ;
const admin = require('./user')
const resourceSchema = new schema({
    name: {
        type: String ,
        required: true ,
        index: { unique: true } 
    },
    url: {
        type: String ,
        required: true 
    },
    description: {
        type: String 
    }, 
    adminRef: {
        type: schema.Types.ObjectId, 
        ref: 'admin' 
    }
}, { timestamps: true })

module.exports = mongoose.model("resource", resourceSchema) 

