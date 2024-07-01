import Joi, { string } from "joi"
import { z } from "zod"

const createMovieValidationSchema = z.object({
    name: z.string(),
    duration: z.string(),
    image: z.string(),
    genres: z.array(z.string()),
    about: z.string(),
    releaseDate: z.string(),
    cast: z.array(
        z.object({
            name: z.string(),
            photo: z.string(),
        }),
    ),
    crew: z.array(
        z.object({
            name: z.string(),
            position: z.string(),
            photo: z.string(),
        }),
    ),
    movieFormats: z.array(
        z.object({
            language: z.string(),
            formats: z.array(z.string()).nonempty(),
        }),
    ),
})

export const movieValidations = {
    createMovieValidationSchema,
}
