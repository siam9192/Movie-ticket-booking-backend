import mongoose from "mongoose"
import { TMovie } from "./movie.interface"
import { Movie } from "./movie.model"

const createMovieIntoDb = async (payload: TMovie) => {
    const result = await Movie.create(payload)
    return result
}

const findMovieByIdFromDB = async (movieId: string) => {
    const result = await Movie.findById(movieId)
    return result
}

const updateMovieIntoDB = async (movieId: string, payload: Partial<TMovie>) => {
    const movie = await Movie.isMovieExists(movieId)
    //  Checking is the movie exists
    if (!movie) {
        throw new Error("Movie not found")
    }
}

const findMovieByNameFromDB = async (movieName: string) => {
    const result = await Movie.find({ name: movieName })
    return result
}
const deleteMovieFromDB = async (movieId: string) => {
    const result = await Movie.findOneAndDelete(
        { _id: new mongoose.Types.ObjectId(movieId) },
        { new: true },
    )
    return result
}

export default {
    createMovieIntoDb,
    findMovieByIdFromDB,
    findMovieByNameFromDB,
    deleteMovieFromDB,
}
