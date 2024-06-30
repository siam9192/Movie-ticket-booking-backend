import jwt from "jsonwebtoken"
import config from "../config"
import nodemailer from "nodemailer"
export const successResponse = (
    statusCode: number,
    message: string,
    result: any,
) => {
    return {
        statusCode: statusCode,
        message: message,
        data: result,
    }
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret)
}

export const createToken = (
    secret: string,
    payload: any,
    expireTime: string,
) => {
    return jwt.sign(payload, secret, { expiresIn: expireTime })
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "owsaamgaming@gmail.com",
        pass: "gilp adld kigj rmds",
    },
})

const emailHtml = (otp: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-height: 50px;
        }
        .content {
            padding: 0 20px;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }
        .info {
            margin-bottom: 20px;
        }
        .info p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://img.freepik.com/premium-vector/movie-ticket-logo-template-design_20029-891.jpg" alt="Logo">
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Your OTP (One-Time Password) for authentication is:</p>
            <p class="otp-code">${otp}</p>
            <div class="info">
                <p>This OTP is valid for 5 minutes. Please do not share this OTP with anyone.</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent by MovieBuzz.com. If you did not request this OTP, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`
}
export const sendEMail = async (emailAddress: string, otp: string) => {
    await transporter.sendMail({
        from: "owsaamgaming@gmail.com",
        to: emailAddress,
        subject: "Verify your account",
        html: emailHtml(otp),
    })
}
