import { Model } from "mongoose"

export type TMovieCast = {
    name: string
    photo: string
}
export type TMovieCrew = {
    name: string
    position: string
    photo: string
}

export type TMovieFormat = {
    language: string
    formats: string[]
}

export interface TMovie {
    name: string
    duration: string
    image: string
    genres: string[]
    about: string
    releaseDate: string
    cast: TMovieCast[]
    crew: Array<TMovieCrew>
    movieFormats: Array<TMovieFormat>
}

export interface TMovieMethods extends Model<TMovie> {
    isMovieExists(id: string): Promise<TMovie>
}
