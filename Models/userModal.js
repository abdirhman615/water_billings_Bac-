const mongoose = require("mongoose")
const joi=require("joi")
mongoose.pluralize(null)
const userSchema = new mongoose.Schema({
Collector_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"custmer",
    required:true
},
username:{
    type:String,
    required:true,
    unique:true
},
Password:{
    type:String,
    required:true
},
userStatus:{
    type:String,
    enum:["active","pending","blocked"],
}

},{timestamps:true})

const userModal = mongoose.models.users || mongoose.model("users",userSchema)
const UserRegValidate = (userData) =>{
    const user = joi.object({
        Collector_id:joi.string().required(),
        username:joi.string().required(),
        Password:joi.string().required().min(3),
        userStatus:joi.string().required(),
    })
    return user.validate(userData)
}

const LoginValidate =(userData)=>{
    const user = joi.object({
        username:joi.string().required(),
        Password:joi.string().required().min(3)
    })
    return user.validate(userData)
}

module.exports={userModal,UserRegValidate,LoginValidate}
