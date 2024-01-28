import mongoose from "mongoose";

export const connectToDB=()=>{
const mongoURI=process.env.DB_CONNECTION||
 "mongodb+srv://esty62133:<password>@cluster0.dbaogff.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI).then((suc) => {
    console.log("Mongo DB connected"),suc.connection.host})
.catch(err => {
    console.log("cannot connect db")
    process.exit(1);
})
}


// "mongodb+srv://esty62133:<password>@cluster0.dbaogff.mongodb.net/?retryWrites=true&w=majority"

// "mongodb+srv://esty62133:<esty62133>@cluster0.dbaogff.mongodb.net/?retryWrites=true&w=majority"
