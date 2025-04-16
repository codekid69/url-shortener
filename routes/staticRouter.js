const express = require('express');
const router = express.Router();
const Url = require('../model/url');
const { restrictToLoggedInUser } = require('../middleware/auth');
router.get('/', restrictToLoggedInUser, async (req, res) => {
    console.log("inside home rest",req.user);
    const userId = req.user.id;  // Assuming req.user has the user details
    if(req.user.isAdmin==false){
        const urls = await Url.find({ createdBy: userId });
        return res.render("home", { Urls: urls , user:req.user});
    }
    const urls = await Url.find({});
    return res.render("home", { Urls: urls , user:req.user});
})
router.get('/signup', (req, res) => {
    res.render('signup');
})
router.get('/login', (req, res) => {
    res.render('login', { message: "" });
})
router.post("/logout", (req, res) => {
    res.clearCookie("uid");
    res.redirect("/login");
});
module.exports = router;