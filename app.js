//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");

const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/";

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connected successfully");
  }
});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const postSchema = mongoose.Schema({
  title : String,
  body : String
});

const Post = mongoose.model("Post", postSchema);




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {

  Post.find({},function(err,items_found){
    if(err){
      console.log(err);
    }
    else{
      res.render("home", {
        paragraph: homeStartingContent,
        jsObject: items_found
      });
    
    }
  })


  // console.log(posts);
})

app.get("/about", function (req, res) {
  res.render("about", {
    paragraph: aboutContent
  });
})

app.get("/contact", function (req, res) {
  res.render("contact", {
    paragraph: contactContent
  });
})

app.get("/compose", function (req, res) {
  res.render("compose");
})


app.get("/posts/:testparam/id/:testid", function (req, res) {
  console.log(req.params.testparam);
  console.log(req.params.testid);

  const curr_param = req.params.testparam;
  const curr_id = req.params.testid;

  Post.findOne({_id:curr_id}, function(err, item_found){
    if(!err){
      console.log(item_found);
      res.render("post", {
        title:  item_found.title,
        body: item_found.body
      })

    }
  })




})


app.post("/compose", function (req, res) {
  postTitle = req.body.postTitle;
  postBody = req.body.postBody;


  const post1 = new Post({
    title: postTitle,
    body: postBody
  });

  post1.save();

  res.redirect("/")
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});