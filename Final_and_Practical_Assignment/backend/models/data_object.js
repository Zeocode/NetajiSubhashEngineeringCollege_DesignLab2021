let mongoose = require('mongoose')
let mySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    contact:Number,
    password:String,
    
})

module.exports=mongoose.model('details',mySchema)