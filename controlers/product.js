import { Product, productValidator } from "../models/productSchema.js";
import mongoose from "mongoose";

//שליפת כל המוצרים
export const getAllProducts = async (req, res) => {
    let { search, page, perPage = 10 } = req.query;
    try {
        let AllProducts;
        let searchObject = {};
        if (search)
            searchObject.name = new RegExp(search, "i");//יצירת תנאי חיפוש חופשי בשאילתה 
               //ה-i אומר להתעלם מאותיות גדולות/קטנות

   //שליפת כל המוצרים ממסד הנתונים
        AllProducts = await Product.find(searchObject)
            .sort({ name: -1 })//מיון
            .skip((page - 1) * perPage)// דילוג 
            .limit(perPage);//מקסימום פריטים שאפשרתי לו להביא /לאחר הדילוג
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
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("not valid id")
        //(כנראה מתוך כמה מנהלים)בדיקה האם מי שרוצה למחוק הוא גם זה שהוסיף את המוצר לאתר
        let product = await Product.findById(id);
        if(!product)
            return res.status(404).send("לא נמצא מוצר עם קוד זה למחיקה")
        if (product.userAdded != req.myuser._id)//
            return res.status(403).send("you cannot delete product you didn add")
        let deletedProduct = await Product.findByIdAndDelete(id)
       
        return res.json(deletedProduct)
    }
    catch {

    }
}

//עדכון פרטי מוצר
export const updateProduct = async (req, res) => { 
    try {
       let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
          return res.status(400).send("not valid id to update product")
          
       let { name, category,company,price,size ,color,imgUrl } = req.body;

       let poductToUpdate = await Product.findById(id)
       if (!poductToUpdate)
            return res.status(404).send("לא נמצא מוצר עם כוד כזה")
        poductToUpdate.name =name || poductToUpdate.name;
        poductToUpdate.category = category || poductToUpdate.category;
        poductToUpdate.company =company || poductToUpdate.company;
        poductToUpdate.price =price || poductToUpdate.price;
        poductToUpdate.size = size || poductToUpdate.size;
        poductToUpdate.color =color || poductToUpdate.color;
        poductToUpdate.imgUrl =imgUrl || poductToUpdate.imgUrl;
        await poductToUpdate.save()
        res.status(200).json(poductToUpdate)
    }
    catch (err) {
        res.status(400).send("מצטערים יש שגיאה בעדכון המוצר" + err)
        console.log(err.message);
    }
}

//הוספת מוצר חדש

export const addProduct = async (req, res) => {
    let { name, company, category, price,size, color } = req.body;

    let validate = productValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.masage)

    try {

        let sameProduct = await Product.find({ name, company, price });
        if (sameProduct.length > 0)
            return res.status(409).send("כבר קיים מוצר כזה במערכת")

        let newProduct = await Product.create({ userAdded: req.myuser._id, name, company, category,price, size, color })
      
        
        return res.status(201).json(newProduct)
    }
    catch (err) {
        console.log(err.masage)
        res.status(400).send("שגיאה בהוספה אין אפשרות להוסיף מוצר זה" + err)
    }
}
