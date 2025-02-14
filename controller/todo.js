const Todo=require("../models/todo");
const user=require("../models/user");
async function handleDeleteTodo(req,res){
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todo');

}

async function handleCreateTodo(req,res){

await Todo.create({
  userId: req.user.userid,
  task:req.body.task
})
res.redirect("/todo");
}

async function handleGetAllTodo(req,res){
const todos=await Todo.find({userId:req.user.userid});
res.render("index",{todos});
}

async function handleEditTodo(req,res){
const todo=await Todo.findById(req.params.id);
res.render("edit",{todo});
}

async function handleUpdateTodo(req,res){
  await Todo.findByIdAndUpdate(req.params.id,{
    task:req.body.task
  })
  res.redirect("/todo");
}

module.exports={
  handleCreateTodo,handleGetAllTodo,handleEditTodo,handleUpdateTodo,handleDeleteTodo
}