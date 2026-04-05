const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    imageName:{
        type:String,
        required:true,
        unique:true,

    }
})

const imageModel = mongoose.model('image', imageSchema)

module.exports = imageModel