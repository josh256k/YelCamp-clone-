let mongoose = require("mongoose");

//connecting mongoose to the database
mongoose.connect("mongodb://localhost/cat_up");

//Defining what a cat looks like.
let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

//Adding  a cat to the DB
let george = new Cat({
    name: "Morris",
    age: 7,
    temperament: "Evil"
});
george.save(function(err, cat){
    if(err){
        console.log("SOMETHING WENT WRONG!!!");
    }else{
        console.log("WE JUST SAVED A CAT TO THE DB");
        console.log(cat);
    }
});
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "bland"
}, function(err, cat){
    if (err) {
        console.log("SOMETHING WENT WRONG!!!");
    }else{
        console.log("WE JUST SAVED A CAT TO THE DB");
        console.log(cat);
    }
})
//Retrieving  a cat from the database
Cat.find({}, function(err, cats){
    if (err){
        console.log("SOMETHING WENT WRONG!!!");
        console.log(err);
    }else{
        console.log("ALL THE CATS.............");
        console.log(cats)
    }
})