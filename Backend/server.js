require("dotenv").config({ path: "config/.env" });
const express = require("express");
const connectDB = require("./Database/db");
const app = require('./app');

const port = process.env.PORT;

//MONGODB CONNECTION CALLED
connectDB();


app.listen(port, () => {
    console.log(`Server running @ port http://localhost:${port}`);
});
 