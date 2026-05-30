import chalk from 'chalk'
import connectDB from './src/db/db.js';
import app from './src/app.js';


connectDB()
app.listen(3000 , (req , res) => {
    console.log(chalk.bold.green('Server is running on port 3000'))
})