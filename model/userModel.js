const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
 
    name:String,
    avatar:String,
    email:String,
    pass:String

    
},{
    versionKey:false
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}

