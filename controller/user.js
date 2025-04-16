const User = require("../model/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');
async function userSignUp(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body)
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please provide all the required fields'
        })
    }

    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/login')

}

// In your login controller (POST)
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { message: 'Please provide all the required fields' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.render('login', { message: 'Invalid credentials' });
    }

    // creating the session id and setting it in service/auth.js also getting the user from there on the various requests
    // const sessionId = uuidv4();
    // console.log(sessionId); // Logs the session ID
    // setUser(sessionId, user); // Store the user in the session map
    const token =setUser(user); // returning the jwt token
    console.log("signed token",token); // Logs the session ID
    res.cookie("uid",token)// setting the cookie in the browser
    // res.json({token});
    return res.redirect('/');
};


module.exports = { userSignUp, userLogin }