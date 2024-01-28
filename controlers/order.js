import mongoose from 'mongoose';
import { Order, orderValidator } from '../models/orderSchema.js';
//שליפת כל ההזמנות רק למשתמש מנהל
export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find();
        if (!allOrders)
            return res.status(404).send("אין מוצרים להציג")
        res.json(allOrders);
    }
    catch (err) {
        res.status(400).send(" שגיאה בהצגת כל ההזמנות " + err.message);
    }
}
//הזמנת מוצר
export const addOrder = async (req, res) => {

    let { dueDate, address: { city, street, houseNumber }, arrProduct = [], orderCameOut } = req.body;

    // let userId = req.myuser._id;

    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error.message)
    try {
        let newOrder = await Order.create({ dueDate, address: { city, street, houseNumber }, arrProduct, orderCameOut, costumerId: req.myuser._id });
        console.log(newOrder)
        res.status(201).json(newOrder)
    
    } catch (error) {
        console.error(error);
        res.status(500).send("קרתה שגיאה בוספת המוצר");
    }
};
//פונקציה למחיקת הזמנה
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.myuser;


    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("מזהה הזמנה לא חוקי");
    try {
        const order = await Order.findById(id);

        if (!order) return res.status(404).send("ההזמנה לא נמצאה");

        if (order.orderCameOut === true)
            return res.status(403).send("ההזמנה כבר הושלמה");
        if (role !== "ADMIN" && _id !== order.costumerId)
            return res.status(403).send("אין לך הרשאות למחוק הזמנה זו");

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) 
            return res.status(500).send("נכשל במחיקת ההזמנה");
         res.status(200).json(deletedOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).send("שגיאה במחיקת ההזמנה");
    }
};

//שליפת כל ההזמנות של משתמש מסוים
export const getUserUrder = async (req, res) => {
    try {
        let { _id } = req.myuser;
        let userOrders = await Order.find({costumerId:_id})
        if (userOrders.length==0)
            return res.status(401).send("לא נמצאו הזמנות ללקוח זה")
        res.json(userOrders)
    }
    catch (err) {
        res.status(400).send("שגיאה בהבאת ההזמנוות " + err.message);
        console.log(err.message)
    }
}
//עדכון הזמנה שיצאה לדרך על ידי מנהל
export const setOrderComeOut = async (req, res) => {
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("מזהה הזמנה לא חוקי");
    try {
        let order = await Order.findById(id);

        if (!order)
            return res.status(404).send("ההזמנה לא נמצאה");
        if (order.orderCameOut === true)
            return res.status(403).send("ההזמנה כבר הושלמה");
        order.orderCameOut=true;
        await order.save();
        res.status(200).send("ההזמנה עודכנה בהצלחה ויצאה לדרך")

    }
    catch (err) {
        res.status(400).send("שגיאה בעדכון ההזמנה ליציאה לדרך " + err.message);
        console.log(err.message)
    }
}
