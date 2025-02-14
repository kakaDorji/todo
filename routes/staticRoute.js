const express=require('express');
const router=express.Router();
const path=require("path");
router.get('/',(req,res)=>{
  res.render("homepage");
})
router.get("/register",(req,res)=>res.render("register",{query:req.query}));
router.get("/login",(req,res)=>res.render("login",{query:req.query}));
router.get("/sent-request",(req,res)=>{
  res.render("email");
})
router.get("/reset-password",(req,res)=>{
  res.render("reset");
})


module.exports=router;