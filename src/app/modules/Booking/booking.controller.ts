import { catchAsync } from "../../utils/catchAsync"
import { ApiResponse } from "../../utils/response"
import { BookingServices } from "./booking.service"

const createBooking = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await BookingServices.createBookingIntoDB(payload)
    ApiResponse.sendResponse(res, {
        statusCode: 200,
        message: "Booking successful",
        data: result,
    })
})

export const BookingControllers = {
    createBooking,
}
