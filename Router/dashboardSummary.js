const express=require('express');
const router =express.Router();

const custmerModal = require('../Models/custmerModal')
const bilingModal = require('../Models/bilingModal')
const collectorModal = require('../Models/collectorModal')
const {receiptModal,receiptRegValidate} = require('../Models/receiptModal')
const {userModal,UserRegValidate,LoginValidate} = require('../Models/userModal')


router.get('/',async function(req,res){


let custmerdata=await custmerModal.find()
let NumberOfCustmer=custmerdata.length;

let CollectorData=await collectorModal.find()
let NumberOfCollector=CollectorData.length;

let UsersData=await userModal.find()
let NumberOfUsers=UsersData.length;

let BilingData=await bilingModal.find()
let NumberOfBiling=BilingData.length;

// let receiptData=await receiptModal.find()
let AllAmount=BilingData.reduce((total,item)=>total+item.total,0)
let TotalAmountPaid=BilingData.reduce((total,item)=>total+item.amountPaid,0)
let TotalBalance=BilingData.reduce((total,item)=>total+item.Balance,0)

res.send({
    NumberOfCustmer:NumberOfCustmer,
    NumberOfCollector:NumberOfCollector,
    NumberOfBiling:NumberOfBiling,
    NumberOfUsers:NumberOfUsers,
    AllAmount:AllAmount,
    TotalAmountPaid:TotalAmountPaid,
    TotalBalance:TotalBalance

})

});



module.exports=  router