const User=require("../models/user");
const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
  userId:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true},
  task:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    default:false
  },

},{timestamps:true})

module.exports=mongoose.model("Todo",todoSchema);