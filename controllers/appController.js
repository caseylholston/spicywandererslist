var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    db = require('../models');

var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
};

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.get("/dashboard", isLoggedIn, function(req, res) {
      db.Todos.findAll({}).then(function(dbTodos) {
    var hbsObject = {
      todoList: dbTodos
    };  
    
    res.render("dashboard", hbsobject);
});
});


router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
}));

router.get("/signin", passport.authenticate('local-signup', {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
}));

router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
});


router.get("/signin", function(req, res) {
    res.render("signin");
});

module.exports = router;