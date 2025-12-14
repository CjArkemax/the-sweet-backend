// require ('dotenv').config({path:'./env'})
import dotenv  from "dotenv"

import connectDB from "./db/index.db.js";
dotenv.config({
    path:'./.env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port:${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed!!",err);
    
})//call back inside both catch and then




/*(async =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //same as mongoose.connect localhost:/testdb
    }catch(error){
        console.error("ERROR",error);
        throw err
        
    }
})*/