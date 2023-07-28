const log = require("../lib/trace")
const validateToken = require("./validateToken")
const { verifyAccessToken } = require("./verify")

function authenticateToken(req, res, next){
    let token = null;
    log.info("headers", req.headers)
    try{
        token = validateToken(req.headers)
    } catch(error){
        log.error(error.message)
        if(error.message === "Token not provided"){
            return res.status(401).json({ error: "Token not provided"})
        }if(error.message === "Token format invalid"){
            return res.status(401).json({error: "Token format invalid"})
        }
    }

    try{
        const decoded = verifyAccessToken(token)
        req.user = {...decided.user}
        next()
    }catch(error){
        console.log("Token invalid", token, error)
        return res.status(403).json({error:"token invalid"})
    }
}

module.exports = authenticateToken;