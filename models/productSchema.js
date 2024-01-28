import joi from "joi";
import mongoose from "mongoose";
const productSchema = mongoose.Schema(
    {
        name:{ type: String, required: true },
        category:{ type: String, required: true },
        company:{ type: String, required: true },
        price:{ type: Number, required: true },
        size:{ type: String, required: true },
        color:{ type: String, required: true },
        imgUrl: { type: String, default: "https://casabella.co.il/cdn/shop/files/IMG_6112.jpg?v=1701244542&width=400" }
    })
export const Product = mongoose.model("products", productSchema);

export const productValidator = (_productToValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        category: joi.string().required(),
        company: joi.string().required(),
        price:joi.number().min(1).required(),
        size:joi.string().required(),
        color:joi.string().required(),
        imgUrl: joi.string()
    })
    return productJoi.validate(_productToValidate)}
