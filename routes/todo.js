  const express=require("express");
const { handleCreateTodo, handleGetAllTodo, handleEditTodo, handleUpdateTodo, handleDeleteTodo } = require("../controller/todo");
  const route=express.Router();

  //get all tas
  route.get("/",handleGetAllTodo);
  route.post("/add",handleCreateTodo);
  route.get("/edit/:id",handleEditTodo);
  route.put("/update/:id",handleUpdateTodo);
  route.delete("/delete/:id",handleDeleteTodo);







  
   module.exports=route
