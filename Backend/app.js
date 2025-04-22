const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//ROUTES
const authRoutes = require('./Routes/Auth');
app.use('/api/auth', authRoutes); 

module.exports = app;
