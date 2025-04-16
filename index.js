const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT||3000;
const urlRouter = require('./routes/url');
const path = require('path');
const db = require('./config/db');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUser } = require('./middleware/auth');
app.use(cookieParser());
app.set('view engine', 'ejs');//setting the view engine to ejs
app.set('views', path.join(__dirname, 'views'));//setting the views folder to views



db().then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));// this will check the header and if the header has a content type of application/x-www-form-urlencoded, it will parse the body and make it available in req.body



app.use('/', staticRouter);// this will use the staticRouter for all the routes that start with /
app.use('/url',restrictToLoggedInUser, urlRouter);
app.use('/user', userRouter);// this will use the userRouter for all the routes that start with /user
 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})