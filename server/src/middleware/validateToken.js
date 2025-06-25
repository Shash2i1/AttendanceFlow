import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"

const validateToken = async (req, res,next) =>{
    const token = req.cookies.token;
    
    if(!token){
        return res.status(404).json({message:"Unauthorized access"});
    }

    try {
        const decrypted = jwt.verify(token, process.env.JWT_TOKEN);
        
        const user = await User.findOne({email: decrypted.email});

        req.user = {email: user.email, _id: user._id, name: user.name};
        next();

    } catch (error) {
        return res.status(500).json({message: "Internal server Error"});
    }
}

export default validateToken;