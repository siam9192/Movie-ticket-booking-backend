import { Model } from "mongoose"

export type TReview = {
    movieId: string
    ratting: number
    comment: string
    reviewer: string
}

export interface TReviewMethods extends Model<TReview> {
    isReviewExists(id: string): Promise<TReview>
}
