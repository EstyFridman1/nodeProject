import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(403).send("חסר טוקן- שים לב להרשם קודם")
    try {
        req.myuser = jwt.verify(token, process.env.jwt_SECRET);
        next();
    }
    catch {
        res.status(401).send("הטוקן שלך כבר לא זמין/לא תקין יש להרשם מחדש")
    }

}

export const authAdmin = (req, res, next) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(403).send("חסר טוקן- שים לב להרשם קודם")
    try {

        let user = jwt.verify(token, process.env.jwt_SECRET);
        if (user.role == "ADMIN") {
            req.myuser = user;
            next();
        }
        else {
            return res.status(403).send(" אין לך הרשאת מנהל-לא תוכל לבצע את מבוקשך ")
        }    
    }
    catch {
        res.status(401).send("הטוקן שלך כבר לא זמין/לא תקין יש להרשם מחדש")

        }
    }