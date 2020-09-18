var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//AUTHNITICATION ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });


    if (req.body.adminCode === 'secretcode123') {
        newUser.isAdmin = true;
    }
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome" + user.username);
            res.redirect("/blogs");
        });
    });
});

// LOGIN ROUTES             
//render login form
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req, res) {

});


//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/blogs");
});



module.exports = router;