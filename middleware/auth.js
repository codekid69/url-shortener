const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
    const userId = req.cookies?.uid;
    // const userId=req.headers["authorization"];
    console.log(userId);
    if (!userId) {
        return res.redirect('/login');
    }
    // const token = userId.split("Bearer ")[1].trim();//spliting the token 
    const user = getUser(userId);
    if (!user) {
        return res.redirect('/login');
    }

    req.user = user; // User request object me attach kar diya
    console.log("cookie me user info:",user); 
    next();
}

module.exports = { restrictToLoggedInUser };
