import Joi from "joi";

const userSchema = Joi.object({
    name : Joi.string().required() , 
    email : Joi.string().required() , 
    password : Joi.string().required() ,
    purpose : Joi.string().required(), 
    age : Joi.number()
});

export { 
    userSchema 
}