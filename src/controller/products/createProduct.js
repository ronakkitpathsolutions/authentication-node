import { allFieldsRequired, handleAdminAccess, isTokenExpired } from "../../helpers/index.js"
import product from "../../model/product.js"

export const createProduct = async (req, res) => {
    const {
        product_name,
        product_image,
        product_description,
        category,
        colours,
        rating,
        products_images,
        countryOfOrigin
    } = req.body
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

        const isAllFieldRequired = allFieldsRequired([product_name, product_description, category, colours])
        if (isAllFieldRequired) return res.status(400).json({
            type: "error",
            message: "All fields are required."
        })

        const isAdmin = await handleAdminAccess(token)

        if(!isAdmin) return res.status(401).json({
            type: "error",
            message: "Unauthorized user."
        })

        const data = new product({
            product_name,
            product_image,
            product_description,
            category,
            colours,
            rating,
            products_images,
            countryOfOrigin
        })
        const productData = await data.save()
        
        res.status(201).json({
            type: "success",
            message: "Product added successfully.",
            data: productData
        })

    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: error.message || 'Something went wrong.',
        });
    }
}