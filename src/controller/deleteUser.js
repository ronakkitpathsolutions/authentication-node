import { isTokenExpired, isValidObjectId, verifyUserToken } from '../helpers/index.js'
import user from '../model/user.js'


export const deleteUser = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {

        if (!token) return res.status(401).json({
            type: "error",
            message: "No token provided."
        })

        // const isExpiredToken = await isTokenExpired(token)
        // if(isExpiredToken) return res.status(401).json({
        //     type: "error",
        //     message: "Sorry, This token is expired please try again later."
        // })

        const verifiedUser = await verifyUserToken(token)
        console.log('verifiedUser', verifiedUser)
        if (verifiedUser?.role === 'admin') {
            if (verifiedUser?.user_id === id) return res.status(401).json({
                type: "error",
                message: "You are not able to delete this user."
            })
            if(!isValidObjectId(id)) return res.status(401).json({
                type: "error",
                message: "Please enter a valid user id."
            })
            const deleteObject = await user.findByIdAndDelete(id)
            if (!deleteObject) return res.status(404).json({
                type: "error",
                message: "User not found."
            })
            return res.status(200).json({
                type: "success",
                message: "User deleted successfully.",
                data: deleteObject?.toJSON()
            })
        } else return res.status(401).json({
            type: "error",
            message: "You are not able to delete this user."
        })

    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}