import { NextFunction, Request, Response } from "express"

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Something went wrong"
    type TErrorSource = {
        path: string | number
        message: string
    }[]
    const errorSources: TErrorSource = []
    return res.status(statusCode).json({
        success: false,
        message: err.message,
    })
}

export default globalErrorHandler
