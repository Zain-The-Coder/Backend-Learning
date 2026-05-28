require('dotenv').config();
const { default: chalk } = require('chalk');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONDODB_URI);
        console.log(chalk.bold.green(`MongoDB Connected Successfully || ${connectionInstance.connection.host}`));
    } catch (e) {
        console.log(`DataBase Not Connected || Due To : ${e.message}`)
    }
}

module.exports = connectDB;