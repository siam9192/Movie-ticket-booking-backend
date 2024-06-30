import { Schema, model } from "mongoose"
import { TUser, TUserMethods, TUserName } from "./user.interface"
import bcrypt from "bcrypt"
import config from "../../config"

const nameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        required: true,
    },
})
const userSchema = new Schema<TUser>(
    {
        name: {
            type: nameSchema,
            required: true,
        },
        profilePhoto: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

userSchema.statics.isUserExists = async (id: string) => {
    return await User.findById(id)
}
userSchema.pre("save", async function () {
    const cryptedPassword = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_round_number),
    )
    this.password = cryptedPassword
})
export const User = model<TUser, TUserMethods>("User", userSchema)
