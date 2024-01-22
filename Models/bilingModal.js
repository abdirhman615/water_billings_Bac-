const { date, number } = require("joi")
const mongoose = require("mongoose")

const bilingSchema = new mongoose.Schema({
Custmer_id:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"custmer",
    required:true
},
new_date:{
    type:Date,
    required:true
},
Akhirska_hory:{
    type:Number,
    required:true
},
Akhirska_dambe:{
    type:Number,
    required:true
},
farqi:{
    type:Number,
    required:true
},
Rate:{
    type:Number,
    default:1.5,
    required:false
},
total:{
    type:Number,
    default:0,
    required:false
},
Balance:{
    type:Number,
    default:0,
    required:false
},
Collector_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"collector",
    required:true
},
amountPaid:{
    type:Number,
    default:0,
    required:false
},
TotalAmountPaid:{
    type:Number,
    required:false
},
},{timestamps:true})

const bilingModal = mongoose.model("biling",bilingSchema)

module.exports=bilingModal
