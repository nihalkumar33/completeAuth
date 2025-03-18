import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const url = process.env.MONGO_URL;

console.log(url)

// export a function that connects to DB

const db = () => {
    mongoose.connect(url)
     .then(() => {
        console.log("Connected to mongoDB");
     })
     .catch((err) => {
        console.log("Error connecting to mongoDB");
     });
}

export default db;

