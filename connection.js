const mongoose=require("mongoose");
require("dotenv").config();
async function connectMongoDB(){
try{
await mongoose.connect(process.env.MONGODB_URL);
console.log("connect to mongoose");
}catch(error){
console.error("error connecting to mongoDB:",error.message);
process.exit(1);
}
}  
module.exports={connectMongoDB};