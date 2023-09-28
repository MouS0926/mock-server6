const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const { auth } = require("../middleware/auth.middleware");
const { BlogModel } = require("../model/blogModel");

const blogrouter=express.Router()

blogrouter.post("/post",auth, async (req,res)=>{
   
  try {
   const blog=new BlogModel({...req.body,date:new Date()})
   await blog.save()
   res.status(200).send({"blog":"New blog created"})
  } catch (error) {
   res.status(400).send({"err":error})
  }
    
})

blogrouter.get("/",auth, async (req,res)=>{
   
   try {

      const {title,category,sort, order}=req.query
      const searchbytitle=title?{title:{$regex:title,$options:"i"}}:{}
      const filterbycat=category?{category}:{}
      const query={...searchbytitle,...filterbycat}



      let sortOptions = {};

    if (sort && order) {
      if (order.toLowerCase() === "asc") {
        sortOptions[sort] = 1;
      } else if (order.toLowerCase() === "desc") {
        sortOptions[sort] = -1;
      }
    }
    const blogs=await BlogModel.find(query).sort(sortOptions)
    
    res.status(200).send(blogs)
   } catch (error) {
    res.status(400).send({"err":error})
   }
     
 })

 

 blogrouter.patch("/:id",auth, async (req,res)=>{
   const {id}=req.params
   
   try {
    let authblogs=await BlogModel.findOne({_id:id,userid:req.body.userid})
    if(!authblogs)
    {
     return res.status(404).send({"msg":"You are not authorised"})
    }
    
    authblogs=await BlogModel.findByIdAndUpdate({_id:id},req.body)

    res.status(200).send(authblogs)
   } catch (error) {
    res.status(400).send({"err":error})
    console.log(error);
   }
     
 })


   module.exports={
    blogrouter
   }
