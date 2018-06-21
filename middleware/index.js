let Campground = require("../models/campground");
let Comment = require("../models/comment")

// All middleware goes here
let middlewareObj = {};

//Checking wether the user owns a campground
middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                //does the user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });

    } else {
        res.redirect("back");
    }
}


//Checking wether the user owns a comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error", "Campground not found!");;
                res.redirect("back");
            } else {
                //Check whether the user owns the comment
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don not have permission to do that!");
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

// Checking whether user is logged in
middlewareObj.isloggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj