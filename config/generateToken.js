import jwt from "jsonwebtoken"
import { redisClient } from "../index.js"

export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SCERET, {
        expiresIn: '1m'
    })

    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })

    const refreshTokenKey = `refresh_token:${id}`
    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken)
    // For local development use SameSite 'lax' and secure=false so cookies
    // are accepted by browsers when frontend is on a different origin.
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    })
    return { accessToken, refreshToken }
}


export const verifyRefreshToken = async (refreshToken) => {
    try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET)

        const storedToken = await redisClient.get(`refresh_token:${decode.id}`)
        if (storedToken == refreshToken) {
            return decode
        } return null
    } catch (error) {
        return null
    }
}

export const generateAccessToken = async (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SCERET, {
        expiresIn: "1m",
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1 * 60 * 1000,
    })
}