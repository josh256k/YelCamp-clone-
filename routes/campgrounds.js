let  express         = require("express");
let Campground       = require("../models/campground");
let middleware       = require("../middleware/index");
let router           = express.Router();



//INDEX - show all campgrounds
router.get("/", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds}); this hard coded
    //Get all campgrounds from the DB
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allcampgrounds });
        }
    });

});

//CREATE - add new campground to DB
router.post("/", function (req, res) {
    // Get data from forms and add to the campground array
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {
        name: name,
        price: price,
        image: image,
        description: description,
        author: author
    };
    //Create a new camp ground and save to the database
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            // campground.author.id = req.user._id
            // campground.author.username = req.user.username
            // campground.save();
            //Redirect to the campgrounds page.
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });

});


//NEW - Show form to create new campground.
router.get("/new", middleware.isloggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground.
router.get("/:id", function (req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });

});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res, ) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campground Updated!");
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//DESTROY CAMPGROUND ROUTE - DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;