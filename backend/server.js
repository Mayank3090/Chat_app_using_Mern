import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";
import {app,server} from './socket/socket.js';


const PORT=process.env.port||5051;

const __dirname=path.resolve();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
   res.sendFile(path.join(__dirname,"fronend","dist","index.html"))
})
//app.get("/",(req,res)=>{
   // res.send("hello world!!");
//})



server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running at ${PORT}`)});