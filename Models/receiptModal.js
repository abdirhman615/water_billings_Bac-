const mongoose = require("mongoose")
const joi=require("joi")
const { number } = require("joi")
mongoose.pluralize(null)
const receiptSchema = new mongoose.Schema({
Custmer_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"custmer",
    required:true
},
Biling_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"biling",
    required:true
},

PhonePaid:{
    type:Number,
    required:false,
},
receiptAmount:{
    type:Number,
    required:true
},
receiptStatus:{
    type:String,
    default:"paid",
    enum:["paid","pending"],
}

},{timestamps:true})

const receiptModal = mongoose.model("receipt",receiptSchema)
const receiptRegValidate = (receiptData) =>{
    const receipt = joi.object({
        Custmer_id:joi.string().required(),
        Biling_id:joi.string().required(),
        receiptAmount:joi.number().required(),
        PhonePaid:joi.number().required(),
        
    })
    return receipt.validate(receiptData)
}



module.exports={receiptModal,receiptRegValidate}
