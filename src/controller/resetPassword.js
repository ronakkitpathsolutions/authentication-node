import { verifyUserToken } from "../helpers/index.js"


export const resetPassword = async (req, res) => {
    const { password, confirm_password } = req.body
    const { token } = req.headers

    try {

        if(!token) return res.status(401).json({
            type: "error",
            message: "No token provided."
        })

        if(!password || !confirm_password) return res.status(400).json({
            type: "error",
            message: "All fields are required."
        })
    
        if (password !== confirm_password) return res.status(400).json({
            type: "error",
            message: "password and confirm password does not matched."
        })

        const verifiedUser = await verifyUserToken(token)
        console.log('verifiedUser', verifiedUser)
        return res.json({
            type: "success",
            data: verifiedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}