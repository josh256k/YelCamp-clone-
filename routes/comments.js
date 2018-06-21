//COMMENTS NEW
let express      = require("express");
let Campground   = require("../models/campground");
let Comment      = require("../models/comment");
let middleware   = require("../middleware/index");
let router       = express.Router({mergeParams: true});


router.get("/new", middleware.isloggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            })
        }
    });

});


//COMMENTS CREATE
router.post("/", middleware.isloggedIn, function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //Create a new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id
                    comment.author.username  = req.user.username
                    //save comment
                    comment.save();
                    campground.comments.push(comment)
                    campground.save();
                    req.flash("success", "Comment successfully create");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
    //Connect new comment to campground
    //redirect to campground page
});

//EDIT ROUTE
//Note that our comments are nested in campgrounds
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment });
        }
    });
});

//UPDATE ROUTE FOR COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    // res. send("YOU HAVE HOT THE UPDATE ROUTE!!")
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if(err){
            req.flash("error", "Something went wrong!");
            console.log(Err);
        } else {
            req.flash("success", "Comment Updated!");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


// DESTROY ROUTE FOR COMMENTS
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!")
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});



module.exports = router;