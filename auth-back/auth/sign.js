const jwt = require('jsonwebtoken');
require("dotenv").config();

//si algo no funciona puede ser el options de jwt
const sign = function (payload,isAccessToken){
    const access_or_refresh = isAccessToken? process.env.ACCESS_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
    const respuesta = jwt.sign(payload, access_or_refresh, { expiresIn: 3600,
        algorithm: "HS256",})
    return respuesta
    }

const generateAcccesToken = function(user){ //funciona correctamente
    return sign(user,true)
}

const generateRefreshToken = function(user){ 
    return sign(user,false)
}

module.exports = {generateAcccesToken,generateRefreshToken}