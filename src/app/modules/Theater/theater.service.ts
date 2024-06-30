import AppError from "../../Error/AppError"
import QueryBuilder from "../../QueryBuilder/QueryBuilder"
import { TTheater } from "./theater.interface"
import { TheaterModel } from "./theater.model"
import { generateTheaterId } from "./theater.utils"

const createTheaterIntoDB = async (payload: TTheater) => {
    const isTheaterExists = await TheaterModel.findOne({
        name: payload.name,
        address: payload.address,
    })

    if (isTheaterExists) {
        throw new AppError(400, "Theater is already exits on same location")
    }
    const theaterId = await generateTheaterId()
    payload.id = theaterId
    const result = await TheaterModel.create(payload)
    return result
}

const getAllTheatersFromDB = async (query: any) => {
    const theaterSearchableFields = ["name"]
    const result = new QueryBuilder(TheaterModel.find(), query)
        .search(theaterSearchableFields)
        .find()
        .sort()
        .paginate()

    return await result
}

const getSingelTheaterByTheaterIdFromDB = async (theaterId: string) => {
    const result = await TheaterModel.findOne({ id: theaterId })
    return result
}

const updateTheaterIntoDB = async (
    theaterId: string,
    payload: Partial<TTheater>,
) => {
    const { address, ...othersData } = payload

    const isTheaterExists = await TheaterModel.findById(theaterId)
    if (!isTheaterExists) {
        throw new AppError(400, "Theater not found")
    }

    const modifiedUpdatedData: any = {
        ...othersData,
    }

    // If address found  then convert address for mongodb filtering

    if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
            modifiedUpdatedData[`address.${key}`] = value
        }

        const addressKeys = ["area", "city", "country"]

        const filteredAddress: any = { ...address }

        const foundedTheaterAddress: Record<string, any> =
            isTheaterExists.address
        addressKeys.forEach((key) => {
            if (!Object.keys(address).includes(key)) {
                filteredAddress[key] = foundedTheaterAddress[key]
            }
        })

        // Find the theater in same address

        const isTheaterExistsInSameAddress = await TheaterModel.findOne({
            name: isTheaterExists.name,
            address: { ...filteredAddress },
        })

        // If theater is founded on the same address
        if (isTheaterExistsInSameAddress) {
            throw new AppError(
                400,
                `${isTheaterExists.name} named Theater is already exists in same location`,
            )
        }
    }

    const result = await TheaterModel.findByIdAndUpdate(
        theaterId,
        modifiedUpdatedData,
        { new: true },
    )
    return result
}

export const theaterServices = {
    createTheaterIntoDB,
    getSingelTheaterByTheaterIdFromDB,
    updateTheaterIntoDB,
}
