const express = require('express');
const app = express();
const mongoDB = require('./db');
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use('/api', require("./Routes/createUser"));
app.use('/api', require("./Routes/displayData"));

app.get("/",(req,res)=>{
    res.send("hello pipal");
})

app.listen(5000,()=>{
    console.log("server is live at port 5000");
})