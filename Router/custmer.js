const express=require("express")
const custmerRouter=express.Router();
const custmerModal = require('../Models/custmerModal')
const auth=require('../midleware')
custmerRouter.get("/",async (req,res)=>{

    const AllCustmer = await custmerModal.find()
    res.json({AllCustmer})
})



custmerRouter.post("/",async(req,res)=>{
 try {
    const newCustmer = new custmerModal(req.body)
  await newCustmer.save()
  res.send({status:"success",message:"successfully Add"})
 } catch (error) {
    console.log(error.message)
 }
 

})


custmerRouter.put('/:id', async (req, res) =>{
    try {
        let {id}=req.params

let updatedData=await custmerModal.findByIdAndUpdate(id,{
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    guri_NO:req.body.guri_NO,
    Zone:req.body.Zone,
    
},{ new: true })

res.send({status:"success",message:"successfully updated"})
        
    } catch (error) {
        res.send(error.message)
    }

})


custmerRouter.delete('/:id', async (req, res)=> {
    try {
        let {id} = req.params

    await custmerModal.findByIdAndDelete(id)

        res.send({status: "success", message:"successfully deleted"})
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports =custmerRouter
