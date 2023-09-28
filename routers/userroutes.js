const express=require("express")

const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/userModel");
const userrouter=express.Router()




userrouter.post("/register",async (req,res)=>{
   
 try {
        const {name,avatar,email,pass}=req.body
        const isExist=await UserModel.findOne({email})
        if(isExist){
            return res.status(400).send({"msg":"Email already regsitered"})
        }

        

        bcrypt.hash(pass, 5,async (err, hash) =>{
            if(err){
                res.status(400).send({"err":err})
                console.log(err);
            }
            else{
                const user=new UserModel({name,avatar,email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"new user registered successfully"})
            }
        });



    } catch (error) {
        res.status(500).send({"err":error})
        console.log(error);
    }

 
})


userrouter.post("/login",async (req,res)=>{

    try {
        const{email,pass}=req.body
        const user=await UserModel.findOne({email})
        if(user){
            
            bcrypt.compare(pass, user.pass, function(err, result) {
                if(result){
                //    const token = jwt.sign({ mypayload: 'hello' }, 'moumita');
                   const token=jwt.sign({ userid: user._id,username:user.name }, 'moumita')
                 const currentId=user._id
                   res.status(200).send({"msg":"Login Successful",token,currentId})
                }else{
                    res.status(400).send({"msg":"Wrong password"})
                }
            });
        }
        else{
            return res.status(400).send({"msg":"Invalid credentials"})
        }


    } catch (error) {
        res.status(500).send({"err":error})
        console.log(error);
    }
})

module.exports={
    userrouter
}