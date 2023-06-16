const router = require("express").Router()
const { jsonResponse } = require("../lib/jsonResponse")
const User = require ("../schema/userSchema")

router.post("/", async function (req, res, next) {
    const { username, password, name } = req.body;
  
    if (!username || !password || !name) {
      //return next(new Error("username and password are required"));
      return res.status(409).json(
        jsonResponse(409, {
          error: "username and password are required",
        })
      );
    }
  
    try {
        
        const userExists = await User.find({username:username});

        if(userExists.length>0){
            return res.status(409).json(jsonResponse(409, {error: "username already exists" }))
    } else{
            const user = new User({ username, password, name });
            await user.save();
            return res.status(200).json(jsonResponse(200, {message: "User created succesfully" }))
        }
    } catch (err) {
      return res.status(500).json(
        jsonResponse(500, {
          error: "Error creating user",
        })
      );
      //return next(new Error(err.message));
    }
  });

module.exports = router;