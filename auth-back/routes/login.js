const router = require("express").Router()
const { jsonResponse } = require("../lib/jsonResponse")

router.post("/", (req,res) =>{
    const {username,name,password} = req.body
    
    if(!username || !password){
        return res.status(400).json( jsonResponse(400, {
            error:"Fields are required"
        }))
       
    }

    //Auth
    const accessToken = "accessToken"
    const refreshToken = "refreshToken"
    const user = {
        _id:"id",
        name:name,
        username:username,
    }
    return res.status(200).json( jsonResponse(200, {
        user,accessToken,refreshToken
    })) 
})

module.exports = router;