import express from 'express' ;
const app = express() ;
app.use(express.json());

app.listen(3000 , (req , res) => {
    console.log("ha basha");

})

app.get("/" , (req , res) => {
    res.send({message : "hello world"})
});

let users = [] ; 

app.get("/users" , (req , res) => {
    res.send(users);
})

app.post("/users" , (req , res) => {
    const userDetails = req.body ;
    let user = {...userDetails , id : users.length + 1};
    users.push(user);
    res.send({message : "Data Added Successfully !"});
    
})

app.delete("/users/:id" , (req , res) => {
    const {id} = req.params ;
    const data = users.filter(u => u.id !== Number(id));
    res.send(data);
})

app.patch("/users/:id" , (req , res) => {
    const {id} = req.params ;
    const data = users.find(u => u.id === Number(id));
    if (!data) {
        return res.status(404).send({ message: "User not found" });
    }
    if(req.body.email ? data.email = req.body.email : data.email) ;
    if(req.body.username ? data.username = req.body.username : data.username) ;
    if(req.body.password ? data.password = req.body.password : data.password) ;
    res.send(data)
})


app.put("/users/:id" , (req , res) => {
    const {id} = req.params ;
    const data = users.find(u => u.id === Number(id));
    if (!data) {
        return res.status(404).send({ message: "User not found" });
    }
    if(req.body.email ? data.email = req.body.email : data.email) ;
    if(req.body.username ? data.username = req.body.username : data.username) ;
    if(req.body.password ? data.password = req.body.password : data.password) ;
    res.send(data)
})