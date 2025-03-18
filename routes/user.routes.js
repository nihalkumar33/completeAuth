import express from "express"
import { registerUser } from "../controller/user.controller.js"

// this is used for routing, so we need to import this

// ab I can make routes 

const router = express.Router() // iska matlab dekhna kya hai

router.post("/register", registerUser)

export default router