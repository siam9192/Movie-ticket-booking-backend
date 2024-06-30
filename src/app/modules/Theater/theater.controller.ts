import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { theaterServices } from "./theater.service"

import { TTheater } from "./theater.interface"
import { successResponse } from "../../utils/constant"
import { ApiResponse } from "../../utils/response"

const createTheater = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await theaterServices.createTheaterIntoDB(payload)
    ApiResponse.sendResponse<TTheater>(
        res,
        successResponse(200, "Theater is created Successfully", result),
    )
})

const getSingelTheaterByTheaterId = catchAsync(
    async (req: Request, res: Response) => {
        const { theaterId } = req.params
        const result =
            await theaterServices.getSingelTheaterByTheaterIdFromDB(theaterId)
        if (result) {
            ApiResponse.sendResponse(
                res,
                successResponse(200, "Theater is fetched Successfully", result),
            )
        } else {
            ApiResponse.sendNoDataFoundResponse(res, 404)
        }
    },
)
const updateTheater = catchAsync(async (req: Request, res: Response) => {
    const { data: payload } = req.body
    const { theaterId } = req.params
    const result = await theaterServices.updateTheaterIntoDB(theaterId, payload)
    ApiResponse.sendResponse(
        res,
        successResponse(200, "Theater is updated Successfully", result),
    )
})
export const theaterController = {
    createTheater,
    getSingelTheaterByTheaterId,
    updateTheater,
}
