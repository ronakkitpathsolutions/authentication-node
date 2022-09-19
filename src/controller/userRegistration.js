import { generateNewToken, hashPassword } from "../helpers/index.js"
import user from "../model/user.js"



export const createUserRegistration = async (req, res) => {
    const { username, email, contact, password, confirm_password } = req.body
    try {

        if (!username || !email || !contact || !password || !confirm_password) {
            return res.status(400).json({
                type: "error",
                message: "All fields are required."
            })
        }
        if (password !== confirm_password) return res.status(400).json({
            type: "error",
            message: "password and confirm password does not matched."
        })

        const existUser = await user.findOne({ email })
        if (!!existUser) return res.status(400).json({
            type: "error",
            message: "email already exist."
        })

        const data = new user({
            username, email, contact, password: await hashPassword(password)
        })
        const userData = await data.save()
        res.status(201).json({
            type: "success",
            message: "User register successfully.",
            token: await generateNewToken({
                user_id: userData?._id,
                email: userData?.email,
                role: userData?.role,
                username: userData?.username,
                contact: userData?.contact
            })
        })

    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}