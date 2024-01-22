const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    try {
        const token = req.header("token")
        if(!token) return res.json("Sorry Token ma hesid")
        const tokenValidate= jwt.verify(token,process.env.SECRET_KEY)

        next()
        
    } catch (error) {
        res.json("Sorry Token Kaaga Sax ma Ahan")
    }
}

module.exports=auth