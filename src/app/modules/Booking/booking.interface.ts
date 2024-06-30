import { Types, Schema } from "mongoose"

export type TBooking = {
    show: Schema.Types.ObjectId
    seats: number[]
    paidAmount: number
    bookerInfo?: {
        name: string
        email?: string
        phone: string
    }
    booker: Types.ObjectId
}
