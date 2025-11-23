
const dotenv= require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser= require('cookie-parser');
const authRoute = require('../routes/auth')
const expenseRoute= require("../routes/expense");
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT ||  4000;  


app.get("/", (req, res)=>{
    res.send("I am working")
})

/*==============Routes=====================  */
app.use('/api/auth', authRoute);
app.use('/api/expenses',expenseRoute);

/*==============App Listen=====================  */
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})