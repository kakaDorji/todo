const User=require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');
require('dotenv').config();
const bcrypt=require("bcryptjs");
require('dotenv').config()

async function handleRegisterUser(req,res){
const {email,password}=req.body;
try{
const userExist=await User.findOne({email});
if(userExist) return res.redirect('/register?message=email alreay exist');
const hashedPasword=await bcrypt.hash(password,10);
const newUser=new User({
  email,password:hashedPasword
})

await newUser.save();
res.redirect("/register?message=user registerd successully");


}catch(e){
res.status(500).json({message:'server error'});
}


}
async function handleLoginUser(req,res){
  const {email,password}=req.body;
  try{
const user=await User.findOne({email});
if(!user) return res.status(400).json({message:"User not exist"});

const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch) return res.status(400).json({message:"invalide password or email"});
const token=jwt.sign({
  userid:user._id,
  role:user.role,
},process.env.JWT_SECRET,{expiresIn:"1h"});
//res.json({token})
res.cookie("token",token);
res.redirect("/todo");

  }catch(error){
    console.log(error); 
   res.status(500).json({message:"server error"});
  }

}

async function handleLogout(req,res){
res.clearCookie('token');
res.redirect('/login')
}
async function handleRequestPassword(req,res){
const {email}=req.body;
const user=await User.findOne({
  email
});
if(!user) return res.status(400).send("user not found");
const token=jwt.sign({email:user.email},process.env.JWT_SECRET);

user.resetToken=token;
await user.save();
//send email
const transpoter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'karsonam458@gmail.com', pass: 'azsxpkefuuoxeyae'   } });

const mailOptions={
  from:'your-email@example.com',
  to:email,
  subjest:'password reset',
  text:`Click the link to reset your password: https://todo-9uhu.onrender.com/reset-password?token=${token}`
};
transpoter.sendMail(mailOptions,(err,info)=>{
  if(err) return res.status(500).send(err.toString());
  res.send('reset link sent');
})
}

async function handleResetPassword(req,res){
      const {token,password}=req.body;
      jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err) return res.status(400).send('invalid or expired token');
        const user=await User.findOne({email:decode.email});
        if(!user) return res.status(400).send("user not found");
        const hashedPassword=await bcrypt.hash(password,10);
        user.password=hashedPassword;
        user.resetToken=undefined;
        user.resetTokenExpires=undefined;
         await user.save();
        res.send('password updated');
      })
}


module.exports={
  handleRegisterUser,handleLoginUser,handleLogout,
  handleRequestPassword,handleResetPassword
}