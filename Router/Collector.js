const express=require("express")
const collectorRouter=express.Router();
const collectorModal = require('../Models/collectorModal')
const auth=require('../midleware')

collectorRouter.get("/",async (req,res)=>{

    const AllCollectors = await collectorModal.find()
    res.json({AllCollectors})
})



collectorRouter.post("/",async(req,res)=>{
 try {
    const nwecollector = new collectorModal(req.body)
  await nwecollector.save()
  res.send({status:"success",message:"successfully Add"})
 } catch (error) {
    console.log(error.message)
 }
 

})


collectorRouter.put('/:id', async (req, res) =>{
    try {
        let {id}=req.params

let updatedData=await collectorModal.findByIdAndUpdate(id,{
    name:req.body.name,
    phone:req.body.phone,
    age:req.body.age,
    address:req.body.address,
    salry:req.body.salry
    
},{ new: true })

res.send({status:"success",message:"successfully updated"})
        
    } catch (error) {
        res.send(error.message)
    }

})


collectorRouter.delete('/:id', async (req, res)=> {
    try {
        let {id} = req.params

    await collectorModal.findByIdAndDelete(id)

        res.send({status: "success", message:"successfully deleted"})
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports =collectorRouter
