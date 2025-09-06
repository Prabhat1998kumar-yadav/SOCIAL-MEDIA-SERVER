const mongoose=require("mongoose");

module.exports=async()=>{
    
    const mongoUri="mongodb+srv://prabhat1298:eIsTkqgHhI9JxH4u@cluster0.ko3sv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try{
        const connect=await mongoose.connect(mongoUri);
        console.log(`MongoDb Connected ${connect.connection.host}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
  
}