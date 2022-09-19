import { verifyUserToken } from '../helpers/index.js'
import user from '../model/user.js'


export const deleteUser = async (req, res) => {
    const { token } = req.headers
    const { id } = req.params
    try {

        if (!token) return res.status(401).json({
            type: "error",
            message: "No token provided."
        })

        const verifiedUser = await verifyUserToken(token)
        if (verifiedUser?.role === 'admin') {
            if (verifiedUser?.user_id === id) return res.status(401).json({
                type: "error",
                message: "Admin can not be deleted admin."
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
            message: "Only admin can delete users."
        })

    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}