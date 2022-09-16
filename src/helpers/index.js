import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const hashPassword = async(value) => {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(value, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    })
    return hashedPassword
}

export const generateNewToken = async(payload) => {
    const secret_key = '*@#$%^&*()-_=+'
    const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, secret_key, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
    return token
}