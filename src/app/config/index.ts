import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), "env/.env") })

export default {
    port: process.env.PORT,
    dataBase_url: process.env.DATABASE_URL,
    bcrypt_round_number: process.env.BCRYPT_ROUND_NUMBER,
    default_password: process.env.DEFAULT_PASSWORD,
    otp_secret: process.env.OTP_SECRET_TOKEN,
}
