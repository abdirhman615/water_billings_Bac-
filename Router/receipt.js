const express=require("express")
const receiptRouter=express.Router();
const {receiptModal,receiptRegValidate} = require('../Models/receiptModal')
const bilingModal= require('../Models/bilingModal')
const bcrypt=require("bcrypt")
const joi=require("joi")

receiptRouter.get("/",async (req,res)=>{
try {
    const Allreceipt = await receiptModal.find().populate([{
        path:"Custmer_id",
        model:"custmer",
        select:"-_id name phone guri_NO"
    
    },{
        path:"Biling_id",
        model:"biling",
        select:"_id total Balance"
    }])
    res.json({Allreceipt})
} catch (error) {
    res.json(error.message)
}
})
receiptRouter.get("/LatestReceipts",async (req,res)=>{
try {
    const Allreceipt = await receiptModal.find().populate([{
        path:"Custmer_id",
        model:"custmer",
        select:"-_id name phone guri_NO"
    
    },{
        path:"Biling_id",
        model:"biling",
        select:"_id total Balance"
    }]).sort({'createdAt':-1}).limit(5)
    res.json({Allreceipt})
} catch (error) {
    res.json(error.message)
}
})



receiptRouter.post("/", async(req,res)=>{
    try {
        
// const newreceipt = new receiptModal(req.body)
//          const newbiling = new bilingModal(req.body)

//          newbiling.Balance=(newbiling.total-req.body.receiptAmount)

//         // let jawaabta=receiptModal.Biling_id?.total
//         // console.log(jawaabta)
//         // newreceipt.Balance=(jawaabta-req.body.receiptAmount)


//         // let jawaabta= newreceipt.Balance=(newbiling.total-req.body.receiptAmount)
        
//         // newreceipt.Balance=(req.body.receiptAmount-newreceipt.total)
//         //  newreceipt.total=(jawaabta*newreceipt.Rate)
// console.log(newbiling.Balance)

        const receiptobj =new receiptModal({
            Custmer_id:req.body.Custmer_id,
            Biling_id:req.body.Biling_id,
            receiptAmount:req.body.receiptAmount,
            // PhonePaid:req.bodyPhonePaid,
            Balance:req.body.Balance,
            // TotalAmountPaid:req.body.TotalAmountPaid,
            // amountPaid:req.body.amountPaid
            


           
        });
        let receiptData =await bilingModal.findOne({_id:req.body.Biling_id})
        let currentStatus=""
        receiptData.TotalAmountPaid=receiptData.amountPaid+parseInt(req.body.receiptAmount)
        let totalAmountpaid=receiptData.TotalAmountPaid
        
        receiptData.Balance=receiptData.Balance-parseInt(req.body.receiptAmount)


         let CurrentBalance=receiptData.Balance

        if(receiptData.TotalAmountPaid>receiptData.total){
            return res.send(`Amount you Paid is Less Than or Equl to ${receiptData.total}`)

        }

        if(receiptData.Balance==0){
            currentStatus="fullPaid"
        }else if(totalAmountpaid<receiptData.total){
            currentStatus="partialPaid"
        }
        await receiptobj.save();
      await bilingModal.findByIdAndUpdate(req.body.Biling_id,{
        amountPaid:totalAmountpaid,
        Balance:CurrentBalance,
        receiptStatus:currentStatus
      },{new:true})
      res.send({
        status:"success",
         message:"successfully receipted and also updated Custmer Amount"})

     } catch (error) {
        res.json(error.message)
     }


})


receiptRouter.put('/:id', async (req, res) =>{
    try {
        let {id}=req.params

let updatedData=await receiptModal.findByIdAndUpdate(id,{
    Custmer_id:req.body.Custmer_id,
    receiptname:req.body.receiptname,
    Password:req.body.Password,
    receiptStatus:req.body.receiptStatus
    
},{ new: true })

res.send({status:"success",message:"successfully updated"})
        
    } catch (error) {
        res.send(error.message)
    }

})


receiptRouter.delete('/:id', async (req, res)=> {
    try {
        let {id} = req.params

    await receiptModal.findByIdAndDelete(id)

        res.send({status: "success", message:"successfully deleted"})
    } catch (error) {
        res.send(error.message)
    }
    
})


module.exports =receiptRouter
