import mongoose from "mongoose"
import app from "./app"
import config from "./config"
require("dotenv").config()

const main = async () => {
    await mongoose.connect(config.dataBase_url as string)
    app.listen(config.port, () => {
        console.log("Server is running on ", config.port, " port")
    })
}

main()
