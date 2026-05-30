import mongoose from "mongoose";
import config from "../config/config.js";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.MONGODB_URI);
    console.log(
      chalk.bold.green(
        `MongoDB Successfully Connected || DB Host At : ${connectionInstance.connection.host}`
      )
    );
  } catch (e) {
    console.log(chalk.red.bold(`MongoDB Not Connected Due To : ${e.message}`));
  }
};

export default connectDB;