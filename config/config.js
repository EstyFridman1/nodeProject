import mongoose from "mongoose";

export const connectToDB=()=>{
const mongoURI=process.env.DB_CONNECTION||
"mongodb://0.0.0.0:27017/Store"
mongoose.connect(mongoURI).then((suc) => {
    console.log("Mongo DB connected"),suc.connection.host})
.catch(err => {
    console.log("cannot connect db")
    process.exit(1);
})
}


   


