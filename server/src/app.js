
const dotenv= require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser= require('cookie-parser');
const authRoute = require('../routes/auth')
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT ||  4000;  


app.get("/", (req, res)=>{
    res.send("I am working")
})

app.use('/api/auth', authRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})