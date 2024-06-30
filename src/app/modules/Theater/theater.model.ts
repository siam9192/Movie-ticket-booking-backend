import { Schema, model } from "mongoose"
import { TTheater } from "./theater.interface"

const theaterSchema = new Schema<TTheater>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        address: {
            area: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
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

export const TheaterModel = model<TTheater>("Theater", theaterSchema)
