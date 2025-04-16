// const sessionIdToUserMap = new Map(); // removing the state maintain
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // secret key for signing the JWT
function setUser(user) {
    // sessionIdToUserMap.set(id, user); // removing the statefull map

    // creating the tokens
    // creating payload with user info for the token 
    console.log("getting user for token",user)
    const payload = {
        id: user._id, 
        name: user.name,
        email: user.email, 
        isAdmin:user.isAdmin
        // add more fields if needed, but keep it minimal and non-sensitive
    };
    return jwt.sign(payload, secretKey);  // (payload,secrectKey for signing the token)
}
function getUser(token) {
    // return sessionIdToUserMap.get(id);
    return jwt.verify(token, secretKey); 
}
module.exports = {
    setUser,
    getUser
}


// Biggest Issue with this Map is whenever the server restart the uid get lost from  the server ram even if the uid is present in the browser cookie
// So we need to use a database to store the session id and the user id