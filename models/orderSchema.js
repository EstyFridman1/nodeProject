import joi, { boolean } from "joi";
import mongoose from "mongoose";
const minimalUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
})
const addressSchema = mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
})
const minimalProductUser = mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, default: "https://casabella.co.il/cdn/shop/files/IMG_6112.jpg?v=1701244542&width=400" },
  quantity: { type: Number, default: 1 }
})

const orderSchema = mongoose.Schema({
  orderDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  costumerDetails: { type: minimalUserSchema, require: true },
  addres: { type: addressSchema, require: true },
  arrProduct: { type: [minimalProductUser], require: true },
  orderCameOut: { type: boolean, require: true }
})
export const Order = mongoose.model("orders", orderSchema);


export const productValidator = (_orderToValidate) => {
  let orderJoi = joi.object({
    orderDate: joi.date().required(),
    dueDate: joi.date().required(),

    costumerDetails: joi.object({
      name: joi.string().required(),
      id: joi.string().required().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
      email: joi.string().email().required()
    }),
    address: joi.object({
      city: joi.string().required(),
      street: joi.string().required(),
      houseNumber: joi.string().required()
    }).required(),
    products: joi.array().items(
      joi.object({
        name: joi.string().required(),
        company: joi.string().required(),
        price: joi.number().min(1).required(),
        imgUrl: joi.string(),
        quantity: joi.number().default(1)
      })
    ).required(),
    orderCameOut: joi.boolean().required(),

  });
  return orderJoi.validate(_orderToValidate);
};