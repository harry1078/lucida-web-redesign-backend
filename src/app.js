import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

const app = express()

//allows only below frontend url
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //accepts json
app.use(express.urlencoded({extended: true})) //accepts url

//declaring routes
app.use("/api/v1/users", userRouter)  //http://localhost:8000/api/v1/users/register

export {app}