import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import movieService from "./movie.service"
import { ApiResponse } from "../../utils/response"

const createMovie = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    console.log(payload)
    const result = await movieService.createMovieIntoDb(payload)
    ApiResponse.sendResponse(res, {
        statusCode: 200,
        message: "Movie is created successfully",
        data: result,
    })
})

const deleteMovie = catchAsync(async (req: Request, res: Response) => {
    const { movieId } = req.params
    const result = await movieService.deleteMovieFromDB(movieId)
    ApiResponse.sendResponse(res, {
        statusCode: 200,
        message: "Movie is deleted successfully",
        data: result,
    })
})

export default {
    createMovie,
    deleteMovie,
}
