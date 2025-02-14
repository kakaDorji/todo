const express=require('express');
const {  handleRegisterUser, handleLoginUser, 
  handleLogout, handleRequestPassword, 
  handleResetPassword} = require('../controller/user');
const route=express.Router();

route.get("/logout",handleLogout);
route.post('/register',handleRegisterUser);
route.post('/login',handleLoginUser);
route.post("/send-request",handleRequestPassword);
route.post("/reset-password",handleResetPassword);


module.exports=route;