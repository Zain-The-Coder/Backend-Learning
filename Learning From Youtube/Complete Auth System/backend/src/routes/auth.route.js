import express from 'express' ;
const authRouter = express.Router();
import * as authController from '../controllers/auth.controller.js'

authRouter.post("/register" , authController.registerUser) ;
authRouter.get('/get-me' , authController.getMe);

export default authRouter ;