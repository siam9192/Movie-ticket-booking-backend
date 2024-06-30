import { z } from "zod"

// Define Zod schema for showTimeSchema
const showTimeSchemaZod = z.object({
    date:z.date(),
    time: z.string().time()
})

// Define Zod schema for sitSchema
const sitSchemaZod = z.object({
    seatNumber: z.number(),
    isBooked: z.boolean(),
})

// Define Zod schema for showSchema
export const createShowValidation = z.object({
    movieId: z.string().nonempty(),
    theaterId: z.string(),
    showFormat: z.object({
        language: z.string().nonempty(),
        format: z.string().nonempty(),
    }),
    showTime: showTimeSchemaZod,
    totalSeat: z.number(),
    price: z.number(),
})

const updateShowValidation = createShowValidation.partial()

export const ShowValidations = {
    createShowValidation,
    updateShowValidation,
}
