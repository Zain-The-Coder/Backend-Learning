
import userModel from "../models/user.model.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";


export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyExist = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        });

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

        const accessToken = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, {
            expiresIn: "15m"
        });

        const refreshToken = jwt.sign({
            id : user._id
        } , config.JWT_SECRET , {
            expiresIn : '1d'
        });
        
        res.cookie("refreshToken" , refreshToken , {
            httpOnly : true , 
            secure : true ,
            sameSite : 'strict' , 
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User Created Successfully !",
            userData: user,
            userToken: accessToken
        });
        
    } catch (e) {
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

export async function refreshToken (req , res) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        return res.status(409).json({
            error_Message : "Token Not Found !"
        })
    };

    const decoded = jwt.verify(refreshToken , config.JWT_SECRET);

    const accessToken = jwt.sign({
        id : decoded._id
    } , config.JWT_SECRET , {
        expiresIn : '15m'
    });

    const refresh_Token = jwt.sign({
        id : decoded._id
    }  , config.JWT_SECRET , {
        expiresIn : "7d"
    });

    res.status(200).json({ 
        message : "Access Token Generated Successfully !" , 
        accessToken 
    }); 
}