import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// yaha pe main ab apna saara ka business logic rakhunga
// pehele syntax:

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    // req because mujhe woh chaiye jo url se mere paas aa rha hai
    
    if (!name || !email || !password) {
        res.status(400).json({
            message: "all feilds are required"
        })
    }

    console.log(req.body.password)

    try {
        const exsistingUser = await User.findOne({email})

        if (exsistingUser) {
            return res.status(400).json({
                message: "User already exsists"
            })
        }

        // create user in DB
        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user);

        if (!user) {
            res.status(400).json({
                message: "User not registered"
            })
        }

        // Now make a token for verification 
        const token = crypto.randomBytes(32).toString("hex")
        
        user.verificationToken = token;

        await user.save()

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });

        const mailOption = ({
            from: process.env.MAILTRAP_HOST, // sender address
            to: user.email, // list of receivers
            subject: "verify email",
            text: `Please click on following link: ${process.env.BASE_URL}api/v1/users/verify/${token}`
        });

        console.log(`YOO: ${user.email}`)

        await transporter.sendMail(mailOption);
        
        res.status(200).json({
            message: "User registered successfully"
        })


    } catch (error) {
        console.log(error.message)
    }

}

export { registerUser }