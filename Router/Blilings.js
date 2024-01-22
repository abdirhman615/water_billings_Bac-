const express=require("express")
const bilingRouter=express.Router();
const bilingModal = require('../Models/bilingModal')
const auth=require('../midleware')

bilingRouter.get("/",async (req,res)=>{

    const AllBiling = await bilingModal.find().populate([{
        path:"Custmer_id",
        model:"custmer",
        select:"name phone guri_NO"
    
    },{
        path:"Collector_id",
        model:"collector",
        select:"name phone"
    }])
    res.json({AllBiling})

})



bilingRouter.post("/", async(req,res)=>{
 try {
    const newbiling = new bilingModal(req.body)
     let jawaabta = newbiling.farqi=(req.body.Akhirska_dambe-req.body.Akhirska_hory)
     newbiling.total=(jawaabta*newbiling.Rate)
     newbiling.Balance=(newbiling.total)



  await newbiling.save()



  res.send({status:"success",message:"successfully Add"})
 } catch (error) {
    res.json(error.message)
 }

 

})


bilingRouter.put('/:id', async (req, res) =>{
    try {
        let {id}=req.params

let updatedData=await bilingModal.findByIdAndUpdate(id,{
    Custmer_id:req.body.name,
    new_date:req.body.new_date,
    Akhirska_hory:req.body.Akhirska_hory,
    Akhirska_dambe:req.body.Akhirska_dambe,
    farqi:req.body.farqi,
    Rate:req.body.Rate,
    total:req.body.total,
    Custmer_id:req.body.Custmer_id,
    
    
},{ new: true })

res.send({status:"success",message:"successfully updated"})
        
    } catch (error) {
        res.send(error.message)
    }

})


bilingRouter.delete('/:id', async (req, res)=> {
    try {
        let {id} = req.params

    await bilingModal.findByIdAndDelete(id)

        res.send({status: "success", message:"successfully deleted"})
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports =bilingRouter
