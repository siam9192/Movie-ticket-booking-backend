import mongoose, { Schema, model } from "mongoose"
import { TShow, TShowMethods, TShowSeat, TShowTime } from "./show.interface"

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
    seatNumber: Number,
    isBooked: Boolean,
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
        showTime: {
            type: showTimeSchema,
            required: true,
        },
        seats: {
            type: [sitSchema],
            required: true,
        },
        price: Number,
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
