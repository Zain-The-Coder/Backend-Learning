const express = require('express');
const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

async function registerUser (req , res) {
    try {
    const { username , email , password } = req.body;

    const user = await userModel.create({
        username , email , password
    });

    const token = jwt.sign({
        id : user._id 
    } , process.env.JWT_SECRET);

    res.cookie("token" , token);
    
    res.json({
        status : 201 , 
        message : "User Created Successfully !" , 
        user_Data : user , 
    });
    } catch (e) {
        res.json({
            status : 500 , 
            message : "Failed To Create User Due to : " + e.message ,
        })
    }

}

module.exports = { registerUser };