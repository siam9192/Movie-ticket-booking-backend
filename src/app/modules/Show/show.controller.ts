import { catchAsync } from "../../utils/catchAsync"
import { ApiResponse } from "../../utils/response"
import { ShowServices } from "./show.service"

const createShow = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await ShowServices.createShowIntoDB(payload)
    ApiResponse.sendResponse(res, {
        statusCode: 200,
        message: "Show is created successfully",
        data: result,
    })
})

export const ShowControllers = {
    createShow,
}
