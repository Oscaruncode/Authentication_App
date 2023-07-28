const router = require("express").Router()
const { jsonResponse } = require("../lib/jsonResponse")
const log = require("../lib/trace")
const { verifyRefreshToken } = require("../auth/verify")
const { generateAcccesToken } = require("../auth/sign")
const getUserInfo = require("../lib/getUserInfo")
const Token = require("../schema/token")

router.post("/", async function(req,res){
    log.info("POST /api/refresh-token")
    const refreshToken = req.body.refreshToken
    if(!refreshToken){
        console.log("No update token", refreshToken)
        return res.status(401).json({error:"Update Token not provided"})
    }

    try{
        const tokenDocument = await Token.findOne({ token:refreshToken})

        if(!tokenDocument){
            return res.status(403).json({error: "Update Token Invalid"})
        }

        const payload = verifyRefreshToken(tokenDocument.token)
        const accessToken = generateAcccesToken(getUserInfo(payload.user))
        res.json(jsonResponse(200,{accessToken}))
    } catch(error){
        return res.status(403).json({error:"Update Token Invalid"})
    }

})

module.exports = router;