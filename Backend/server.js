require("dotenv").config();
const express = require("express");
const connectDB = require("./Database/db");
const app = require('./app');
const Auth = require('./Routes/Auth')
const Time = require('./Routes/Time')

const port = process.env.PORT;

//MONGODB CONNECTION CALLED
connectDB();

app.use('/api',Time)

app.listen(port, () => {
    console.log(`Server running @ port ${port}`);
});
 