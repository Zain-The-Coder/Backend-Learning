import express from 'express' ;
import chalk from 'chalk';
import { userSchema } from './schema/index.js';

const app = express() ;
app.use(express.json());

const port = process.env.port || 3000 ;

app.use("/" , (req , res , next) => {
    console.log(chalk.green.bold("Response From MiddleWare => " , chalk.redBright("Cantroller")));
    next();
})

const users = [] ;

app.get("/users" , (req , res) => {
    res.send(users);
})

app.post("/users" , async (req , res) => {
    try {
        const user = await userSchema.validateAsync(req.body);
        users.push({...user, id: Date.now().toString(36)});
        res.send(users);
        console.log(chalk.grey.bold("User Added Successfully !"));
    } catch (e) {
        console.log(chalk.red.bold(`Error Occured : ${e}`));
    }
})

app.get("/" , (req , res) => {
    res.send("The Server Is Working Fine");
})
app.listen(port , (req , res) => {
    console.log(chalk.green.bold("Server Connected"));
})

