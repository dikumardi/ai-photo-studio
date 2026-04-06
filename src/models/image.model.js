const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    imageName:{
        type:String,
        required:true,
    },
    operationType:{
        type:String,
        enum:["remove-bg","replace-bg"],
        required:true
    },
    prompt:{
        type:String,
        default:null
    }
},{
    timestamps:true
})

const imageModel = mongoose.model('image', imageSchema)

module.exports = imageModel