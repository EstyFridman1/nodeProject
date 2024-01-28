import joi from  "joi";
import mongoose from "mongoose";
const addressSchema=mongoose.Schema({
    city:{type: String, required: true },
    street:{type: String, required: true },
    houseNumber:{type: String, required: true },   
})
const userSchema = mongoose.Schema(
    {
  
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: addressSchema, require:true }
    },
    { timestamps: true }
    )
export const User = mongoose.model("users", userSchema);

export const userValidator = (_userToValidate) => {
    let userJoi = joi.object({

        name: joi.string().required(),
        password: joi.string().required().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        email: joi.string().email().required(),
        address: joi.object({
            city: joi.string().required(),
            street: joi.string().required(),
            houseNumber: joi.string().required()
        }).required(),
        createdAt: joi.date().required()
    })
    return userJoi.validate(_userToValidate)

}

