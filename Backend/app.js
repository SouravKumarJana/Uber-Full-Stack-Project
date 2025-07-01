const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routers/user.routes');
const cookieParser = require('cookie-parser');
connectToDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req,res) =>{
    res.send("hello world");
});

app.use('/users', userRoutes);

module.exports = app;