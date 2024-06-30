import { Schema, model } from "mongoose"
import {
    TMovie,
    TMovieCast,
    TMovieCrew,
    TMovieFormat,
    TMovieMethods,
} from "./movie.interface"

const castSchema = new Schema<TMovieCast>({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
})
const crewSchema = new Schema<TMovieCrew>({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
})

const movieFormatSchema = new Schema<TMovieFormat>({
    language: {
        type: String,
        required: true,
    },
    formats: {
        type: [String],
        required: true,
    },
})
const movieSchema = new Schema<TMovie>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        duration: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        genres: {
            type: [String],
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        cast: {
            type: [castSchema],
            required: true,
        },
        crew: {
            type: [crewSchema],
            required: true,
        },
        movieFormats: {
            type: [movieFormatSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

movieSchema.statics.isMovieExists = async (id: string) => {
    return await Movie.findById(id)
}

export const Movie = model<TMovie, TMovieMethods>("Movie", movieSchema)
