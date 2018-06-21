let express                = require("express"),
    app                    = express(),
    bodyParser             = require("body-parser"),
    mongoose               = require("mongoose"),
    flash                  = require("connect-flash"),
    passport               = require("passport"),
    LocalStrategy          = require("passport-local"),
    Campground             = require("./models/campground"),
    Comment                = require("./models/comment"),
    User                   = require("./models/user"),
    methodOverride         = require("method-override"),
    seedDB                 = require("./seeds")


let campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index")




//Tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));

// set app to access EJS files in the views folder
app.set("view engine", "ejs");

//Setting up the static folder for assets
// app.use(express.static(__dirname + "/public/"));
app.use(express.static("."));
// seedDB();

// Setting up method override.
app.use(methodOverride("_method"))

// Setting up the app to use flash
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Jobaya is progressing!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass currentUser: req.user on  every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// Setting up mongoose for our app/
// mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.connect("mongodb://yelp:Camp2018@ds263710.mlab.com:63710/yelcamp");
//mongodb: //<dbuser>:<dbpassword>@ds263710.mlab.com:63710/yelcamp

// Acquiring routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);






//======================================================================================================================
//Server setup
// app.listen(8080, function(){
//     console.log("Server running.........")
// });

app.listen(process.env.PORT || 5000);