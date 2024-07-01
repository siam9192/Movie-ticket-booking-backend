import mongoose, { Schema, model } from "mongoose"
import { TSeatPrice, TShow, TShowMethods, TShowSeat, TShowTime } from "./show.interface"
import { string } from "joi"

const showTimeSchema = new Schema<TShowTime>({
    date:{
        type:String,
        required:true,
    },
    time: {
        type: String,
        required: true,
    }
})



const sitSchema = new Schema<TShowSeat>({
    seatNumber: {
        type:Number,
        required:true,
    },
    seatType:{
        type:String,
        enum:["standard","premium"],
        required:true
    },
    isBooked: {
        type:Boolean,
        default:false
    }
})


const seatPriceSchema = new Schema<TSeatPrice>({
    standard:{
        type:Number,
        default:null
    },
    premium:{
        type:Number,
        default:null
    }
})
const showSchema = new Schema<TShow>(
    {
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        showFormat: {
            language: {
                type: String,
                required: true,
            },
            format: {
                type: String,
                required: true,
            },
        },
        theaterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        hallNo:{
            type:String,
            required:true
        },
        hallSitPlaneImage:{
            type:String,
            required:true
        },
        showTime: {
            type: Date,
            required: true,
        },
        seats: {
            type: [sitSchema],
            required: true,
        },
        price: {
            type:seatPriceSchema,
            required:true
        },
        isRunning: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

showSchema.statics.isShowExists = async (id: string) => {
    return await Show.findById(id)
}

export const Show = model<TShow, TShowMethods>("Show", showSchema)
