import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/user.js"

import {createClient} from "redis"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config();

const redisUrl=process.env.REDIS_URL
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL
app.use(express.json());
app.use(cookieParser())
app.use("/api",userRoutes)

if(!redisUrl){
    console.log("Missing redis url");
    process.exit(1)
    
}

export const redisClient=createClient({
    url:redisUrl
})

redisClient.connect().then(()=>{
    console.log("Connected to redis");
    
}).catch((Err)=>{
    console.log(Err);
    
})
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    mongoose.connect(MONGO_URL).then(
        console.log(`database connected `)

    ).catch((error) => {

        console.log(`failed at ${error}`);


    })

})

