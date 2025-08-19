const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');

const userRoutes = require('./routers/user.routes');
const captainRoutes = require('./routers/captain.routes');

const mapRoutes = require('./routers/map.routes');
const rideRoute = require('./routers/ride.routes');

const cookieParser = require('cookie-parser');
connectToDB();

const app = express();
app.use(cors());

app.use(express.json());                             //To use req.body, you must use middleware  "like:app.use(express.json()); "    Without this middleware, req.body will be undefined.
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send("hello world");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides',rideRoute);

module.exports = app;