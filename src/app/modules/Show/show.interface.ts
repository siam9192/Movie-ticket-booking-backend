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
    seatNumber: number;
    seatType:"standard" | "premium";
    isBooked: boolean;

}
export type TSeatPrice = {
    standard:number;
    premium:number;
}
export interface TShow {
    movieId: mongoose.Types.ObjectId;
    theaterId: mongoose.Types.ObjectId;
    hallNo:string;
    hallSitPlaneImage:string;
    showTime: Date;
    showFormat: TShowFormat;
    seats: TShowSeat[];
    price: TSeatPrice;
    isRunning?: boolean;
    isDeleted?: boolean;
}

export interface TShowRequestData {
    movieId: mongoose.Types.ObjectId;
    theaterId: mongoose.Types.ObjectId;
    hallNo:string;
    hallSitPlaneImage:string;
    showTime: string;
    showFormat: TShowFormat;
    totalSeat:number;
    standardSeats: number[];
    premiumSeats: number[];
    price: TSeatPrice;
  
}

export interface TShowMethods extends Model<TShow> {
    isShowExists(id: string): Promise<TShow>
}
