import { Product } from "../models/productSchema.js";
import mongoose from "mongoose";

//שליפת כל המוצרים
export const getAllProducts = async (req, res) => {
    let { search, numPages, page, perPage } = req.query;//
    try {
        let AllProducts;
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");
        if (numPages)
            serachObject.numPages = numPages
        //שליפת כל הספרים מהמסד נתונים
         AllProducts = await Product.find({serachObject})
         .sort({ name: -1, numPages: 1 })//
         .skip((page-1)*perPage)
         .limit(perPage);
        res.json(AllProducts);
    }
    catch (err) {
        res.status(400).send("problem in getting all products")
    }
}


//שליפת מוצר לפי קוד
export const getProductId = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))//
        return res.status(400).send("invalid paramter id");

    try {
        let productId = await Product.findOne({ _id: req.params.id });
        if (!productId)
            return res.status(404).send("no product with such id");

        res.json(productId);
    }
    catch (err) {
        res.status(400).send("problem im getting product id " + req.params.id)
    }
}
//מחיקת מוצר
export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id")
    let deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct)
        return res.status(404).send("לא נמצא מוצר עם כוד זה למחיקה")
    return res.json(deletedProduct)
}
//עדכון פרטי מוצר
export const updateProduct = async (req, res) => {
    let { productId } = req.params;
    if (!mongoose.isValidObjectId(productId))
        return res.status(400).send("not valid id to update product")
    try {
        let poductToUpdate = await Product.findById(productId)
        if (!productId)
            return res.status(404).send("לא נמצא מוצר עם כוד כזה")
        poductToUpdate.name = req.body.name || prpoductToUpdate.name;
        poductToUpdate.category = req.body.name || poductToUpdate.category;
        poductToUpdate.company = req.body.name || poductToUpdate.company;
        poductToUpdate.price = req.body.name || poductToUpdate.price;
        poductToUpdate.size = req.body.name || poductToUpdate.size;
        poductToUpdate.color = req.body.name || poductToUpdate.color;
        poductToUpdate.imgUrl = req.body.name || poductToUpdate.imgUrl;
        await poductToUpdate.save()
        res.json(poductToUpdate)
    }
    catch (err) {
        res.status(4000).send("מצטערים יש שגיאה בעדכון המוצר" + err)
    }
}
//הוספת מוצר חדש



export const addProduct = async (req, res) => {
    let { name, company, category, price, color,imgUrl} = req.body;
    
    let validate = productValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0])

    try {

        let sameProduct = await Book.find({ name, company,price});
        if (sameProduct.length > 0)
            return res.status(409).send("כבר קיים מוצר כזה במערכת")

        let newProduct = await Book.create({ userAdded: req.xxxuser._id, name, company, category , color,imgUrl })

        return res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).send("שגיאה בהוספה אין אפשרות להוסיף מוצר זה" + err)
    }
}