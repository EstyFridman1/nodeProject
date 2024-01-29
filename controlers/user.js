import bcrypt from "bcryptjs";
import { User, userValidator, userValidator2 } from "../models/userSchema.js";
import { generateToken } from "../config/jwt.js";

//הוספת משתמש חדש
export const addUser = async (req, res) => {
    try {
        
        let { name, password, email,address: { city, street, houseNumber } } = req.body;
        //בדיקת תקינות ע:"י הפונקציה joi"
        let validate = userValidator(req.body);
        if (validate.error) {
            return res.status(400).send(validate.error.message);
        }
        //הצפנת הקוד
       let hashPassword = await bcrypt.hash(password, 15);
        
        //בדיקת המשתמש עם הערכים שהכניס
        let sameUser = await User.find(req.body);
        if (sameUser.length > 0)
            return res.status(409).send("כבר קיים משתמש כזה במערכת")
        //משתנה חדש עם הערכים איתם נכנס
        let newUser = await User.create({ name, password: hashPassword, email, address: { city, street, houseNumber } });
        let token = generateToken(newUser)//יצירת טוקן

        //הוספת הפרמטרים שלא ניתנים להכנסה
        let { _id} = newUser;
        //החזרת המשתמש החדש כולל הטוקן
        return res.json({ _id, name,password, email, city, street, houseNumber,  token })

    }
    catch (err) {
        console.error(err)
        res.status(500).send("קרתה שגיאה בהוספת המשתמש")

    }

}
//כניסת משתמש רשום
export const login = async (req, res) => {

    let { password, email } = req.body;

    let validate = userValidator2(req.body);
    if (validate.error) {
        return res.status(400).send(validate.error.message);
    }
    try {
        let loggedInUser = await User.findOne({ email });
        if (!loggedInUser)
            return res.status(404).send("לא נמצא משתמש עם מייל כזה ")

        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("לא נמצא משתמש עם סיסמה כזו")
        let { _id, name } = loggedInUser;
        let token = generateToken(loggedInUser);
        //localStorage.setItem("token", JSON.stringify(token))//שמירה
        res.json({ _id, name, email,  token });

    }
    catch (err) {
        res.status(500).send("ישנה בעיה בכניסה לאתר")
    }

}

export const getAllUsers = async (req, res) => {
    try {
        let allusers = await User.find({}, "-password");//projection -לשלוף חלק מהשדות
        res.json(allusers);

    }
    catch (err) {
        res.status(500).send(" מנהל יקר שימ לב ישנה שגיאה בהבאת כל המשתמשים ")
    }

}
// {"name":"moshe",
// "password":"22mm",
// "email":"moshe@gmail.com",
// "address":{"city":"eilat","street":"blomberg","houseNumber":"5"}
// }