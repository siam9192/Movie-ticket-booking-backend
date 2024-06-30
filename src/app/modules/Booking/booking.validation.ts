import { z } from "zod"

const createBookingValidationSchema = z.object({
    show: z.string(),
    seats: z.array(z.number()),
    booker: z.string(),
})

const updateBookingValidationSchema = createBookingValidationSchema.partial()

export const BookingValidations = {
    createBookingValidationSchema,
}
