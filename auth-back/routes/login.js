const router = require("express").Router()
const { jsonResponse } = require("../lib/jsonResponse")
const getUserInfo = require("../lib/userInfo")
const User = require ("../schema/userSchema")

router.post("/", async (req,res) =>{
    const {username,password} = req.body
    
    if(!username || !password){
        return res.status(400).json( jsonResponse(400, {
            error:"Fields are required"
        }))    
    }
    

    //  find is a bad method because find multiples users
    try {
        let user = new User()
        const userExist =  await User.find({username:username})
        if(userExist.length>0){
            user = userExist[0] //Asign the first element of the array return by the db function User.find  
        const passwordCorrect = await user.comparePassword(password,user.password) 
            if(passwordCorrect){
                //tokens auth
                const accessToken = user.accesToken() 
                const userToSend = getUserInfo(user) 
                const refreshToken = await user.refreshToken(user)
                const objectRes = jsonResponse(200,{user:userToSend,accessToken,refreshToken})
                return res.status(200).json(objectRes)

            }else{ 
                console.log("user incorrect or password")
                return res.status(401).json(
                    jsonResponse(401, {
                      error: "username and/or password are incorrect",
                    }))
            }
        }else{ 
            return res.status(401).json(
                jsonResponse(401, {
                  error: "Username not found",
                }))
        }
        
        
        
        
    }catch(error){ console.error}
    
})

module.exports = router;