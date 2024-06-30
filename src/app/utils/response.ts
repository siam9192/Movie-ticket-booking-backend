import { Response } from "express"

type TResponse<T> = {
    statusCode: number
    message?: string
    data: T | any
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: true,
        message: data.message,
        data: data.data,
    })
}

export const sendNoDataFoundResponse = (
    res: Response,
    statusCode: number = 404,
) => {
    res.status(statusCode).json({
        success: false,
        statusCode: 404,
        data: [],
    })
}

export const ApiResponse = {
    sendResponse,
    sendNoDataFoundResponse,
}
