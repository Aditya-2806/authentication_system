import mongoose from "mongoose";

const connect = async()=>{
    try{
       console.log("attempting to connect databse...");
       await mongoose.connect(process.env.MONGO_URI , {});
       console.log("connected to databse");
    }
    catch(error){
        console.log("Failed to connect databse....", error.message);
        process.exit(1);
    }
}


export default connect;