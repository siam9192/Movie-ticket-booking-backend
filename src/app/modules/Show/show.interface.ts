import mongoose, { Model } from "mongoose"

export type TShowFormat = {
    language: string
    format: string
}

export type TShowTime = {
    date:string;
    time: string;
}
export type TShowSeat = {
    seatNumber: number
    isBooked: boolean
}
export interface TShow<> {
    movieId: mongoose.Types.ObjectId
    theaterId: mongoose.Types.ObjectId
    showTime: TShowTime
    showFormat: TShowFormat
    seats: TShowSeat[]
    price: number
    isRunning?: boolean
    isDeleted?: boolean
}

export interface TShowMethods extends Model<TShow> {
    isShowExists(id: string): Promise<TShow>
}
