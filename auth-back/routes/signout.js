const router = require("express").Router()
const Token = require("../schema/tokenSchema")
const validateToken = require("../auth/validateToken")

router.delete("/", async function (req,res,next){
    try{
        const refreshToken = validateToken(req.headers)
        
        await Token.findOneAndRemove({token: refreshToken})
        res.json({
            success: "token removed"
        })
    }catch(error){
        return next(new Error("Error loging out the server " + error.message))
    }
    
    
    res.send("Signout")    
})

module.exports = router;