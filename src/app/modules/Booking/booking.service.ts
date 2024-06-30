import AppError from "../../Error/AppError"
import { Show } from "../Show/show.model"
import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"

const createBookingIntoDB = async (payload: TBooking) => {
    const show = await Show.isShowExists(payload.show.toString())

    // Checking is the show exists
    if (!show) {
        throw new AppError(400, "Show not found")
    }
    // Checking is the show running
    if (!show.isRunning) {
        throw new AppError(400, "This show is not available now ")
    }

    // Checking is the seat available
    console.log(payload.seats)
    for (const sitNumber of payload.seats) {
        const sit = show.seats.find((ele) => ele.seatNumber === sitNumber)
        console.log(sitNumber)
        if (sit && sit.isBooked) {
            throw new AppError(400, `Sit number ${sitNumber} is already booked`)
        } else {
            throw new AppError(404, `Sit number ${sitNumber} not found`)
        }
    }
    payload.paidAmount = show.price * payload.seats.length

    // Creating Booking
    const result = await Booking.create(payload)

    return result
}

const updateBookingIntoDB = async (payload: string) => {}

export const BookingServices = {
    createBookingIntoDB,
}
