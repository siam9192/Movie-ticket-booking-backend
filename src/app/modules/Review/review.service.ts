import AppError from "../../Error/AppError"
import { Movie } from "../Movie/movie.model"
import { TReview } from "./review.interface"
import { Review } from "./review.model"

const createReviewIntoDB = async (payload: TReview) => {
    const movie = await Movie.isMovieExists(payload.movieId)

    // Checking is the movie exists on the database
    if (!movie) {
        throw new AppError(400, "Movie not found")
    }

    // Creating review
    const result = await Review.create(payload)

    return result
}

const updateReviewIntoDB = async (
    movieId: string,
    payload: Partial<TReview>,
) => {
    // Updating review
    const result = await Review.findByIdAndUpdate(movieId, payload)
    return result
}

const getAllReviewsByMovieIdFromDB = async (movieId: string) => {
    // Finding all reviews of movie by movie id
    const result = await Review.find({ movieId: movieId })
    return result
}

export const ReviewServices = {
    createReviewIntoDB,
    updateReviewIntoDB,
    getAllReviewsByMovieIdFromDB,
}
