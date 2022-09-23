import { handleAdminAccess, isTokenExpired } from "../helpers/index.js"
import user from "../model/user.js"


export const getAllUsers = async(req, res) => {
    const { token } = req.headers
    try {
        
        if (!token) return res.status(401).json({
            type: "error",
            message: "No token provided."
        })
        const isExpiredToken = await isTokenExpired(res, token)
        if (isExpiredToken) return res.status(401).json({
            type: "error",
            message: "Invalid token, please try again later."
        })

        const isAdmin = await handleAdminAccess(token)
        if(!isAdmin) return res.status(401).json({
            type: "message",
            message: "Unauthorized user"
        })

        const allUsers = await user.find({role: 'user'})
        const modifyData = allUsers?.map(({_id, username, email, role, contact, created_At}) => {return{id: _id?.toString(), username, email, role, contact, created_At}})
        return res.status(200).json({
            type: "success",
            data: modifyData
        })

    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}