import { z } from "zod"
const userNameValidationSchema = z.object({
    firstName: z.string().min(3),
    middleName: z.string().optional(),
    lastName: z.string().min(2),
})

const createUserValidationSchema = z.object({
    name: userNameValidationSchema,
    profilePhoto: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(30),
})

const updateUserValidationSchema = z
    .object({
        name: userNameValidationSchema.partial(),
        profilePhoto: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
    })
    .partial()

const userRegistrationVerifySchema = z.object({
    otp: z.string(),
})
export const UserValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
    userRegistrationVerifySchema,
}
