
import userModel from "../models/user.model.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import { error } from "console";

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyExist = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        });

        // 1. FIX: Yahan 'return' lagana zaroori hai taake code agay na chale
        if (isAlreadyExist) {
            return res.status(409).json({
                message: "Email Or Username Already Taken By Another User",
            });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.status(201).json({
            message: "User Created Successfully !",
            userData: user,
            userToken: token
        });
        
    } catch (e) {
        // 2. FIX: res.send(500) nahi hota, res.status(500) hota hai
        res.status(500).json({
            error_Message: "User Not Created Due To : " + e.message
        });
    }
}

export async function getMe (req , res) {
    try {
        const token = req.headers.authorization?.split(" ")[1] ;

        if(!token) {
            return res.status(409).json({
                error_Message : "No Token Found !" 
            })
        };

        const decoded = jwt.verify(token , config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        res.status(200).json({
            message : "User Fetched Successfully !" ,
            userData : user
        });
        

    } catch (e) {
        res.status(500).json({
            error_Message : "User Not Found Due to" + e.message
        })
    }
}