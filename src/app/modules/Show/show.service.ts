import AppError from "../../Error/AppError"
import QueryBuilder from "../../QueryBuilder/QueryBuilder"
import { Movie } from "../Movie/movie.model"
import { TheaterModel } from "../Theater/theater.model"
import { TShowRequestData, TShowSeat } from "./show.interface"
import { Show } from "./show.model"

const createShowIntoDB = async (payload: any) => {
    const movie = await Movie.findById(payload.movieId)
    const theater = await TheaterModel.findById(payload.theaterId)
    
    // Checking is the movie exists on database
    if (!movie) {
        throw new AppError(400, "Movie not found")
    }

    // Checking is the movie exists on database
    if (!theater) {
        throw new AppError(400, "Theater not found")
    }

    const findFormat = movie.movieFormats.find((format) => {
        return (
            format.language === payload.showFormat.language &&
            format.formats.includes(payload.showFormat.format)
        )
    })

    // Checking show format
    if (!findFormat) {
        throw new AppError(400, "Unavailable movie format")
    }

    const seats: TShowSeat[] = []
    const premiumSeats:  number [] = payload.premiumSeats;

    // Creating seats
    for (let i = 1; i <= payload.totalSeat; i++) {
        seats.push({ seatNumber: i,seatType:"standard", isBooked: false })
    }
    
    // If premium seats founds then convert seat type standard to premium
    if(premiumSeats && premiumSeats.length){
        premiumSeats.forEach( (seatNumber) =>{
         seats.forEach((seat,index)=>{
            if(seatNumber === seat.seatNumber){
                seats[index].seatType = "premium" 
            }
         })
        })
    }

    payload.seats = seats

    // Creating show of movie
    const result = await Show.create(payload)

    return result
}

const getShowByIdFromBD = async (showId: string) => {
    // Finding show by movie id
    const result = await Show.findById(showId)
    return result
}

const getShows = async (query: any) => {
    const modelQuery = Show.find()
    const result = await new QueryBuilder(modelQuery,query).find().sort().paginate()
    return result;
}
export const ShowServices = {

    createShowIntoDB,
    getShowByIdFromBD,
    getShows
}
