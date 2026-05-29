import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : [true , "Username Is Required !"] , 
        unique : [true , "Username Must Be Unique"]
    } , 
    email : {
        type : String , 
        required : [true , "Email Is Required !"] , 
        unique : [true , "Email Must Be Unique"]
    } ,
    password : {
        type : String , 
        required : [true , "Password Is Required !"] , 
        unique : [true , "Password Must Be Unique"]
    } 
});

const userModel = mongoose.model("user" , userSchema);

export default userModel ;