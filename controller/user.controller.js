import User from "../model/User.model.js"
import crypto from "crypto"

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

    } catch (error) {
        
    }

}

export { registerUser }