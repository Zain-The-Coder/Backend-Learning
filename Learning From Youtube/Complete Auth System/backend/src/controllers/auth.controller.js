import userModel from "../models/user.model.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken' ;
import config from "../config/config.js";

export async function registerUser (req , res) {
    try {
    const {username , email , password} = req.body ;

    const isAlreadyExist = await userModel.findOne({
        $or : [
            {username} , {email}
        ]
    });

    if(isAlreadyExist) {
        res.status(409).json({
            message : "Email Or Username Already Taken By Another User" , 
        })
    };

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        username , 
        email , 
        password : hashedPassword
    });

    const token = jwt.sign({
        id : user._id
    } , config.JWT_SECRET , {
        expiresIn : "1d"
    });

    res.status(201).json({
        message : "User Created Successfully !" , 
        userData : user , 
        userToken : token
    });
    } catch (e) {
        res.send(500).json({
            error_Message : "User Not Created Due To : " + e.message 
        })
    }
}

export async function getMe(req , res) {
    try {
    const token = req.headers.authorization?.split(" ")[1] ;

    if(!token) {
        res.status(409).json({
            error_Message : "Token Not Found !"
        }) 
    };

    const decoded = jwt.verify(token , config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message : "User Fetched Successfully !" , 
        userData : {
            username : user.username ,
            email : user.email
        }
    })
    }  catch (e) {
        res.status(500).json({
            error_Message : e.message
        })
    }

}