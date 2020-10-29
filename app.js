//jshint esversion:6

const express=require ("express");
const https =require ("https");
const bodyparser = require("body-parser");
const app= express();
const ejs = require("ejs");

const homeStartingContent = "This is the home page. ";
const aboutContent = "This is the about page";
const contactContent = "This is the content page  ";
let posts=[];

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended :true}));

app.get("/",function(req,res){
  res.render("home",{homeStartingContent});
})
app.get("/about",function(req,res){
  res.render("about",{aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact",{contactContent})
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",function(req,res){
var report={
  title : req.body.title,
  description : req.body.description
}
posts.push(report);
console.log(posts);
res.redirect("/")
})

app.listen(3000, function(){
  console.log("server started on port 3000");
 })