const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String,
    createdBy: {
        type: String,
        ref: 'user'
    }

})

module.exports = mongoose.model("studentdb", schema)