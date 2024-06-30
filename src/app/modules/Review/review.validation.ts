import { z } from "zod"
import { Ratting } from "./review.constant"
import { number } from "joi"

const createReviewValidationSchema = z.object({
    movieId: z.string().nonempty(),
    ratting: z.number().min(1).max(5),
    comment: z.string().min(1),
    reviewer: z.string().min(1),
})

export const ReviewValidations = {
    createReviewValidationSchema,
}
