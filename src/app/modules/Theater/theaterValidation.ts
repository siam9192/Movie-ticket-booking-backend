import { z } from "zod"

const createTheaterValidationSchema = z.object({
    name: z.string().min(4, "Theater must be  length at least 4 character"),
    address: z.object({
        area: z.string(),
        city: z.string(),
        country: z.string(),
    }),
})
const updateTheaterValidationSchema = z.object({
    name: z
        .string()
        .min(4, "Theater must be  length at least 4 character")
        .optional(),
    address: z
        .object({
            area: z.string().optional(),
            city: z.string().optional(),
            country: z.string().optional(),
        })
        .optional(),
})

export const TheaterValidations = {
    createTheaterValidationSchema,
    updateTheaterValidationSchema,
}
