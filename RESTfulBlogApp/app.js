var express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              mongoose = require("mongoose");

//APP CONFIG              
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err)
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//RESTFUL ROUTES
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});