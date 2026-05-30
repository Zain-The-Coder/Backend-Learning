import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        unique : [true , "Username Must Be Unique"] , 
        required : [true , "Username Is Required !"]
    } ,
    email : {
        type : String , 
        unique : [true , "Email Must Be Unique"] , 
        required : [true , "Email Is Required !"]
    } ,
    password : String
});

const userModel = mongoose.model("user" , userSchema);

export default userModel ;