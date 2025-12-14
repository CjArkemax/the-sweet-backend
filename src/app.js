import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" 
const app = express()

app.use(cors({
    orgin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"14kb"}))//the data can be sent through url so we use this encoder
app.use(express.static("public"))
app.use(cookieParser())//from server to access the cookies in browser and be able to set the cookies too


export { app }