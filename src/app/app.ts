import express, { NextFunction, Request, Response, response } from "express"
import cors from "cors"
import router from "./Routes"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to movie ticket management server",
    })
})

app.use("/api/v1", router)

// Handle  route not found

// app.use((req:Request,res:Response)=>{
//     res.status(400).json(sendResponse("Route not found"))
// })
// Handle global error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({
        success: false,
        message: err.message,
    })
})

export default app
