const express=require("express")
const userRouter=express.Router();
const {userModal,UserRegValidate,LoginValidate} = require('../Models/userModal')
const bcrypt=require("bcrypt")
const joi=require("joi")

userRouter.get("/",async (req,res)=>{
try {

    const Allusers = await userModal.find().populate([{
        path:"Collector_id",
        model:"collector",
        select:"name phone"
    }])
    
    res.json({Allusers})

} catch (error) {
    res.json(error.message)
}
})



userRouter.post("/", async(req,res)=>{
 try {
    const {error}=UserRegValidate(req.body)
    if(error) return res.json(error.message)


    const newuser = new userModal(req.body)
    const salt = await bcrypt.genSalt(10)
    // username:joi.string().email({tlds: {allow: false} })
    // res.json(username)
    // const currentUser=await userModal.findOne({Collector_id:Collector_id})
    // const currentUsername=await userModal.findOne({username:username})
    // if(currentUser) return res.send({status:"error",message:"this Collector  alradey Created User"})
    // if(currentUsername) return res.send({status:"error",message:"this Collector alradey Created User"})
    newuser.Password=await bcrypt.hash(newuser.Password,salt)
  await newuser.save()
  
  res.send({status:"success",message:"successfully Add"})
 } catch (error) {
    console.log(error.message)
 }
 

})


userRouter.put('/:id', async (req, res) =>{
    try {
        let {id}=req.params

let updatedData=await userModal.findByIdAndUpdate(id,{
    Collector_id:req.body.Collector_id,
    username:req.body.username,
    Password:req.body.Password,
    userStatus:req.body.userStatus
    
},{ new: true })

res.send({status:"success",message:"successfully updated"})
        
    } catch (error) {
        res.send(error.message)
    }

})


userRouter.delete('/:id', async (req, res)=> {
    try {
        let {id} = req.params

    await userModal.findByIdAndDelete(id)

        res.send({status: "success", message:"successfully deleted"})
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports =userRouter
