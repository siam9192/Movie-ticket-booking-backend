import { JwtPayload } from "jsonwebtoken"
import AppError from "../../Error/AppError"
import config from "../../config"
import { createToken, sendEMail, verifyToken } from "../../utils/constant"
import { TUpdateUser, TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async (token: string, otpCode: string) => {
    if (!token) {
        throw new AppError(400, "You are not authorized")
    }
    const {
        name,
        email,
        password,
        otp: mainOtp,
    } = verifyToken(token, config.otp_secret as string) as JwtPayload
    if (mainOtp !== otpCode) {
        throw new AppError(400, "Incorrect otp")
    }
    const user = {
        name,
        email,
        password,
    }

    const result = await User.create(user)
    return result
}

const userRegistrationHandler = async (userData: TUser) => {
    // Checking is the userExists
    const user = await User.findOne({ email: userData.email })

    if (user) {
        throw new AppError(400, "User is already exists on this email")
    }

    const payload = userData
    const otp: string = Math.floor(100000 + Math.random() * 900000).toString()

    // Creating token for verify the otp
    const token = createToken(
        config.otp_secret as string,
        { ...payload, otp },
        "5m",
    )
    await sendEMail(payload.email, otp)
    return token
}

const updateUserIntoDB = async (userId: string, payload: TUpdateUser) => {
    const user = await User.isUserExists(userId)
    // Checking is the user exists
    if (!user) {
        throw new AppError(400, "User not found")
    }

    const { name, ...othersData } = payload

    const updatedData: any = {
        ...othersData,
    }

    // if name in updated data then convert it in mongodb updating format
    if (name && Object.keys(name).length) {
        Object.entries(name).forEach((ele) => {
            updatedData[`name.${ele[0]}`] = ele[1]
        })
    }

    const result = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

export const UserServices = {
    userRegistrationHandler,
    createUserIntoDB,
    updateUserIntoDB,
}
