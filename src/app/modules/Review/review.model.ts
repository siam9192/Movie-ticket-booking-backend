import { Schema, model } from "mongoose"
import { TReview, TReviewMethods } from "./review.interface"
import { Ratting } from "./review.constant"

const reviewSchema = new Schema<TReview>(
    {
        movieId: {
            type: String,
            required: true,
            ref: "Movie",
        },
        ratting: {
            type: Number,
            validate: (value: number) => {
                return value < 6
            },
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        reviewer: {
            type: String,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
)
reviewSchema.statics.isReviewExists = async (id) => {
    return await Review.findById(id)
}
export const Review = model<TReview, TReviewMethods>("Review", reviewSchema)
