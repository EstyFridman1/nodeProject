import Joi from "joi";
import mongoose from "mongoose";
const productSchema = mongoose.Schema(
    {
        name:{ type: String, required: true },
        category:{ type: String, required: true },
        company:{ type: String, required: true },
        price:{ type: Number, required: true },
        size:{ type: String, required: true },
        color:{ type: String, required: true },
        userAdded:{type: String},
        imgUrl: { type: String, default: "Casa.webp" }
    })
export const Product = mongoose.model("products", productSchema);

export const productValidator = (_productToValidate) => {
    let productJoi = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        company: Joi.string().required(),
        price:Joi.number().min(1).required(),
        size:Joi.string().required(),
        color:Joi.string().required(),
        imgUrl: Joi.string()
    })
    return productJoi.validate(_productToValidate)}
