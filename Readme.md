##Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTFUL routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

RESTFUL ROUTES

name          url          verb           description
=====================================================================
INDEX         /dogs         GET          Display a list of all dog
NEW           /dogs/new     GET          Display form to make a new dog
CREATE        /dogs         POST         Add new dog to DB
SHOW          /dogs:id      GET          Show info about dog.

#Refactoring Mongoose code.
* Create a models directory
* Use models.exports
* Require everything correctly

#Add Seeds.js file.
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the comment model!
* Make our errors go away.
* Display the comments on the campground show page.

# Comment New/Create
* Discuss nested routes
* Add the comment new and create route
* Add the new comment form

# Add a User Model
* Install all packages needed for authentication
* Define User model.

# Auth pt 2 Register
* Configure passport
* Add register routes
* Add register template

# Auth pt3 Login
* Add login route
* Add login template

# Auth pt 4 Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Show/hide auth links in navbar correctly
* Login and sign up
* Logout

# Refactoring routes in app.js
* Create a route directory.
* Create campground.js, comments.js and index.js files
* Move the respective routes to the files

# Linking users to comment.
* Associate users to comments
* save author's name to a comment automatically

# Editing campgrounds
* Add Method- Override
* Add Edit Route for Campgrounds
* Add Link to the Edit page
* Add Update Route
* Add Update Route
* Fix $set problem

# Deleting campgrounds
* Add a Detroy route
* Add Delete button

# Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons

# Comment Editing
* Add a comment edit route
* Add an Edit button on the show page

# Comment updating
* Add the a put route for updating comments
* Redirect to the show page of that campground.

# Comment delete option
* Add a delete route for comments
* Redirect to that particular campground

# Comment authorization
* Add a middleware to check comment ownership
* Link the middle to the update, edit and destroy routes
* Show/hide delete and edit buttons according to user authorization.

# Refactoring our middleware
* Create a middleware directory
* Create an index.js.
* Refactor all middleware to the file.

# Adding flash message.
* install and configure flash-connect
* set it in the urls.
* Configure the with bootstrap alerts