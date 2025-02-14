const express=require("express");
const { connectMongoDB } = require("./connection");
const app=express();
const {authMiddleware}=require("./middleware/authorization");
const staticRoute=require("./routes/staticRoute");
const path=require("path");
const methodOverride=require("method-override");
const bodyParse=require("body-parser");
const cookieParse=require('cookie-parser')
const todoRoute=require("./routes/todo");
const userRoute=require("./routes/user");
require('dotenv').config();
const ejs=require("ejs");
const PORT=process.env.PORT||4000;


//view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cookieParse());

//route
app.use("/user",userRoute);
app.use("/todo",authMiddleware,todoRoute);
app.use("/",staticRoute);



connectMongoDB();
app.listen(PORT,(req,res)=>{
console.log(`server running onthe port ${PORT}`)
})