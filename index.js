const express = require('express')
require('dotenv').config()
const cors = require('cors')

const App = express();
App.use(express.json())
const DbConnect = require("./DbConfig")
DbConnect()
const auth = require('./midleware')
const custmerRouter = require('./Router/custmer')
const bilingRouter = require('./Router/Blilings')
const collectorRouter = require('./Router/Collector')
const userRouter = require('./Router/user')

const loginRouter = require('./Router/login')

const receiptRouter = require('./Router/receipt')
const DashboardSummary = require('./Router/dashboardSummary')
App.use(cors())

App.listen(0808,()=>{
    console.log("server started")
})
// localhost:0808/
App.get("/",(req,res)=>{

    res.json("Ku so dawaaw Serverkena")

})




App.use("/custmer",custmerRouter)
App.use("/biling",bilingRouter)
App.use("/collector",collectorRouter)
App.use("/user",userRouter)
App.use("/login",loginRouter)
App.use("/receipt",receiptRouter)
App.use("/summary",DashboardSummary)
App.use("/auth",auth)

