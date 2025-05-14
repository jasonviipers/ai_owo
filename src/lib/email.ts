import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST?? '',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER ?? '',
        pass: process.env.GMAIL_PASSWORD ?? '',
    },
})

export const generateOTP = (length: number) => {
    const digits = "0123456789"
    let OTP = ""
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }
    return OTP
}

export const generateOTPExpiry = () => {
    const expiry = new Date()
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000)
    return expiry
}

export const sendOTP = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`,
    }
    await transporter.sendMail(mailOptions)
}

export const verifyOTP = (otp: string, userOTP: string) => {
    return otp === userOTP
}

export const sendMail = async (email: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    }
    await transporter.sendMail(mailOptions)
}