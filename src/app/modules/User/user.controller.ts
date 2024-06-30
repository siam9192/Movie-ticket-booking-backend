import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { UserServices } from "./user.service"
import { ApiResponse } from "../../utils/response"
import { TUser } from "./user.interface"

const handleUserRegistration = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await UserServices.userRegistrationHandler(payload)
        res.status(200).cookie("Bearer/verify", result).json({
            success: true,
        })
    },
)
const createUser = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies["Bearer/verify"]
    const otpCode = req.body.otp
    const result = await UserServices.createUserIntoDB(token, otpCode)
    ApiResponse.sendResponse<TUser>(res, {
        statusCode: 200,
        message: "User registration is  successful",
        data: result,
    })
})

export const UserController = {
    createUser,
    handleUserRegistration,
}
