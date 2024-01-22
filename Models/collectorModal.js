const mongoose = require("mongoose")

const collectorSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
address:{
    type:String,
    required:true
},
salry:{
    type:String,
    required:true
}

},{timestamps:true})

const collectorModal = mongoose.model("collector",collectorSchema)

module.exports=collectorModal
