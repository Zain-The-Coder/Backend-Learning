const { default: chalk } = require('chalk');
const app = require('./src/app.js');

app.listen(3000 , () => {
    console.log(chalk.green.bold("Server Is Running On Port 3000"));
})