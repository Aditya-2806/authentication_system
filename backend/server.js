import express from "express";
// to acess env file
import dotenv from "dotenv"; 
import cors from "cors";
import connect from "./db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";

dotenv.config();


const port = process.env.PORT || 8000;

// instance
const app = express(); 

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// used for cross origin file sharing
app.use(cors());
// used for cookie parser confidential data 
app.use(cookieParser());

// routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file)=>{
    // use dynamic import
    // the is used to do in every file
    import(`./src/routes/${file}`)
    .then((route)=>{
        app.use("/api/v1",route.default);
    })
    .catch((err)=>{
         console.log("failed to load route file", err);
    });
});

// async is used where operation takes time to complete like fetching data from api, database connection , reading a file so instead of waiting other taks canm continue executing
const server = async() =>{
   try{
    await connect();
    app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
    });
   }
   catch(error){
    console.log("Failed to start server...",error.message);
   }
};

server();



// we need to create a database
// create a folder within backend db
// create a file called connect.js  import moongose and make a connect function.
// the connect function is used to fetch mongoDb uri
// we need to create a .env file to store our database uri
// we need cookies package to tarnsfer confidential data 