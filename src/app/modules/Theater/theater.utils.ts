import { TheaterModel } from "./theater.model"

const findLastTheaterId = async () => {
    const latestTheaterId = await TheaterModel.findOne()
        .sort({ createdAt: -1 })
        .lean()
    return latestTheaterId ? latestTheaterId.id : null
}
export const generateTheaterId = async () => {
    const latestTheaterId: any = await findLastTheaterId()

    const latestTheaterYear = latestTheaterId
        ? Number(latestTheaterId.substring(0, 4))
        : null
    const currentYear = new Date().getFullYear()

    let incrementId: string = "1"

    if (latestTheaterId && latestTheaterYear == currentYear) {
        incrementId = String(Number(latestTheaterId.substring(4, 10)) + 1)
    }

    incrementId = `${currentYear}${incrementId.padStart(6, "0")}`
    return incrementId
}
