
const dotenv= require('dotenv');
dotenv.config();
const express = require('express');

const app = express();

const PORT= process.env.PORT ||  4000;  


app.get("/", (req, res)=>{
    res.send("I am working")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})