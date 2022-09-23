import { arrayFormatter } from "../../helpers/formatter.js"
import { handleAdminAccess, isTokenExpired } from "../../helpers/index.js"
import product from "../../model/product.js"

export const getAllProducts = async (req, res) => {
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
        if (!isAdmin) return res.status(401).json({
            type: "error",
            message: "Unauthorized user."
        })

        const products = await product.find({})
        return res.json({
            type: "success",
            data: arrayFormatter(products, {
                _id: "_id",
                product_name: "product_name",
                product_image: "product_image",
                product_description: "product_description",
                colours: "colours",
                category: "category",
                products_images: "products_images",
                rating: "rating",
                countryOfOrigin: "countryOfOrigin"
            })
        })
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}