import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs"

const createAccount = async(req, res) =>{
    
    //extract the info from the request
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
            return res.status(404).json({message:"All Fields are required"});
        }


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        //hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        //create a new user account
        const newUser = new User({name, email:email.toLowerCase(), password:hashedPassword});
        await newUser.save();

        //generate jwt token
        const token = jwt.sign(
            {email: newUser.email, name: newUser.name},
            process.env.JWT_TOKEN,
            {expiresIn: "6d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000 // 6 days
        });

        return res.status(201). json({message: "Account created successfully", data: {_id: newUser._id, email: newUser.email, name: newUser.name}});
        

    } catch (error) {
        return res.status(500).json({error:"something went wrong"});
    }
}

//login method
const login = async(req, res) =>{

    //extract the data
    const {email, password} = req.body;

    //check for the empty data
    if(!email || !password) return res.status(401).json({error:"All fields are required"});

    try {
        
        //check if user with this email exists
        const user = await User.findOne({email:email.toLowerCase()});

        if(!user){
            return res.status(404).json({error:"Email doesn't exist"});
        }

        //compare with password
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(409).json({error:"password is incorrect"});
        }
        //generate jwt token
        const token = jwt.sign(
            {email: user.email, name: user.name},
            process.env.JWT_TOKEN,
            {expiresIn: "6d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 6 * 24 * 60 * 60 * 1000 // 6 days
        });
        return res.status(201).json({message: "Login Successfully", data:{_id:user._id,email: user.email, name: user.name}});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"});
    }
}


//get current user info
const getUser = (req, res) =>{
    return res.status(201).json({data: req.user})
}

//logout method
const logout = (_, res) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ensure this matches how you set it
        sameSite: "strict"
    });
    return res.status(200).json({message:"Logout successfully"});
}

export {
    createAccount,
    login,
    getUser,
    logout
}