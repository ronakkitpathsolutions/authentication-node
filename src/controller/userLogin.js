import { comparePassword, generateNewToken } from "../helpers/index.js"
import user from "../model/user.js"

export const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) return res.status(400).json({
            type: "error",
            message: "All fields are required."
        })

        const findUser = await user.findOne({ email })

        if (!findUser) return res.status(400).json({
            type: "error",
            message: "user not found this email address."
        })

        const isAuthenticated = await comparePassword(password, findUser.password)

        if (!isAuthenticated) return res.status(401).json({
            type: "error",
            message: "unauthorized user."
        })

        return res.status(200).json({
            type: "success",
            message: "User login successfully",
            token: await generateNewToken({
                user_id: findUser?._id,
                email: findUser?.email,
                username: findUser?.username,
                contact: findUser?.contact
            })
        })


    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}