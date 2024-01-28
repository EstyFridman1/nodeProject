
import Joi from "Joi";
import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
});

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        address: { type: addressSchema, required: true },
        role: { type: String, default: "ADMIN" },
        registrationDate : { type: Date, default: Date.now() },
        userAdded: { type:  String}
    },
    { timestamps: true }
);

export const User = mongoose.model("users", userSchema);

export const userValidator = (_userToValidate) => {
    let userJoi = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        email: Joi.string().email().required(),
        address: Joi.object({
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.string().required()
        }).required(),
    }).unknown();

    return userJoi.validate(_userToValidate);
};



export const userValidator2 = (_userToValidate) => {
    let userJoi = Joi.object({
        password: Joi.string().required().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        email: Joi.string().email().required()
    }).unknown();
    return userJoi.validate(_userToValidate)
}


