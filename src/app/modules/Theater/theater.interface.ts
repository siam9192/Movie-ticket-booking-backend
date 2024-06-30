export type TTheaterAddress = {
    area: string
    city: string
    country: string
}
export interface TTheater {
    id: string
    name: string
    address: TTheaterAddress
    isDeleted: boolean
}
