import { Model } from "mongoose"

export type TUserName = {
    firstName: string
    middleName?: string
    lastName: string
}
export type TUser = {
    name: TUserName
    profilePhoto?: string
    address?: string
    phone?: string
    email: string
    password: string
}

export type TUpdateUser = {
    name?: TUserName
    profilePhoto?: string
    address?: string
    phone?: string
}

export interface TUserMethods extends Model<TUser> {
    isUserExists(id: string): Promise<TUser>
}
