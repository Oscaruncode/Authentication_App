const bcrypt= require("bcrypt")
const Mongoose = require("mongoose")
const {generateAcccesToken, generateRefreshToken} = require("../auth/sign")
const getUserInfo = require("../lib/userInfo")
const Token = require("./tokenSchema")

const UserSchema= new Mongoose.Schema({
    id : {type: Object},
    name: {type:String, required:true, unique:true},
    username: {type:String, required:true},
    password: {type:String, required:true},
    
    })

    UserSchema.pre("save", function (next) { //middleware before save
        if (this.isModified("password") || this.isNew) {
          const document = this;
      
          bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
              next(err);
            } else {
              document.password = hash;
              next();
            }
          });
        } else {
          next();
        }
      });

      UserSchema.methods.comparePassword = async function (password,hash){
        const same = await bcrypt.compare(password,hash)
        return same
      }

      UserSchema.methods.accesToken = function (){
        const token = generateAcccesToken(getUserInfo(this)) 
        return token
      }
      UserSchema.methods.refreshToken = async function (user){
       const refreshTok = generateRefreshToken(getUserInfo(user))
       try{
          await new Token({token: refreshTok}).save()
          return refreshTok
       }catch(error){
        console.log("Refresh Token error:",error)
       }
      }


      const modelUser = Mongoose.model("User",UserSchema)



module.exports = modelUser