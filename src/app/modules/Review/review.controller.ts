import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { ReviewServices } from "./review.service"
import { ApiResponse } from "../../utils/response"

const createReview = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await ReviewServices.createReviewIntoDB(payload)
    ApiResponse.sendResponse(res, {
        statusCode: 200,
        message: "Review created successfully",
        data: result,
    })
})

export const reviewController = {
    createReview,
}
