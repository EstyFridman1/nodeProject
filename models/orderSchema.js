
import Joi from "joi";
import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
});

const minimalProductUser = mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, default: "https://casabella.co.il/cdn/shop/products/Casa_bella_chagim_21_128_D7_A1_D7_A4_D7_98_D7_9E_D7_91_D7_A8_09_2021-103_3d0fffed-62f0-4b27-a8a8-3d7cdde23f6c.jpg?v=1682331495&width=400" },
  quantity: { type: Number, default: 1 },
});

const orderSchema = mongoose.Schema({
  orderDate: { type: Date, default: Date.now() },
  costumerId: { type: String },
  dueDate: { type: Date, required: true },
  address: { type: addressSchema, required: true },
  arrProduct: { type: [minimalProductUser], required: true },
  orderCameOut: { type: Boolean, default:false },
});

export const Order = mongoose.model("orders", orderSchema);

export const orderValidator = (_orderToValidate) => {
  const orderJoi = Joi.object({
    orderDate: Joi.date(),
    dueDate: Joi.date().required(),
    address: Joi.object({
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.string().required(),
    }).required(),
    arrProduct: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        company: Joi.string().required(),
        price: Joi.number().min(1).required(),
        imgUrl: Joi.string(),
        quantity: Joi.number().default(1),
      })
    ).required(),
    orderCameOut: Joi.boolean(),
  }).unknown();
  
  return orderJoi.validate(_orderToValidate);
};




