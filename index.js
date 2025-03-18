import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

// dotenv.config()  // used when .env is not in root folder


const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.PORT)

app.use(express.json())

app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Autorisation']
}))

app.get("/", (req, res) => {
    // iska matlab main eak get request karunga / ke upar aur main jo response yha se bhejunga woh mera / pe dikhega
    res.send("Hello I am here")
    console.log(`Request: ${req}`)
    
})

db();


app.use("/api/v1/users/", userRoutes)

// okay ab maine abhi bs eak route likha hu but 
app.listen(port, () => {
    console.log(`Listing at : ${port}`);
})