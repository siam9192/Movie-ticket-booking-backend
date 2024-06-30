import { Schema, model } from "mongoose"
import { TBooking } from "./booking.interface"

const bookingModelSchema = new Schema<TBooking>({
    show: {
        type: Schema.Types.ObjectId,
        ref: "Show",
        required: true,
    },
    seats: {
        type: [Number],
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
    },
    booker: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export const Booking = model<TBooking>("Booking", bookingModelSchema)
