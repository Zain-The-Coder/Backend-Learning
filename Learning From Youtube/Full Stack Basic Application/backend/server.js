import express from 'express' ;
const app = express();


app.get('/api/jokes' , (req , res) => {
    const jokes = [
        {
            id : 1 , 
            title : "1st Joke" , 
            content : "This Is First Joke"
        } , 
        {
            id : 2 , 
            title : "2st Joke" , 
            content : "This Is Second Joke"
        } , 
        {
            id : 3 , 
            title : "3st Joke" , 
            content : "This Is Third Joke"
        } , 
        {
            id : 4 , 
            title : "4st Joke" , 
            content : "This Is Fourth Joke"
        } , 
        {
            id : 5 , 
            title : "5st Joke" , 
            content : "This Is Fifth Joke"
        } , 
    ]
    res.send(jokes);
})


const port = process.env.PORT || 3000 ;

app.listen(port , (req , res) => {
    console.log(`Server at http://localhost:${port}`)
});

