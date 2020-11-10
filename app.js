//jshint esversion:6

// const _ = require("lodash");
// const https =require ("https");
const express=require ("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const app= express();
const mongoose =require('mongoose');

const aboutContent = "This is the about page";
const contactContent = "This is the content page  ";

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended :true}));

mongoose.connect("mongodb://localhost:27017/projectDB",{useNewUrlParser:true, useUnifiedTopology : true });


const projectSchema = {
  name : String,
  description : String,
  tickets :[{
    title : String,
    description : String
  }]
};
const Project = mongoose.model("Project",projectSchema);

const project1 = new Project ({
  name: "My Resume",
  description: "Static Resume Website"
});
const project2 =new Project({
  name:"BugBGone",
  description : "An easy way to connect to developer",
})
const project3 = new Project({
  name: "Algorithm Visualizer",
  description : "A simple path-algorithm visualizer ,to better understand the path finding algorithms",
})
const defaultProjects=[project1,project2,project3];

Project.deleteMany()
Project.insertMany(defaultProjects,function(err){
if(err){
  console.log(err);
}else{
  console.log("successfully added default projects");
};
});

const userSchema={
  email:String,
  password:String
}
const User = new mongoose.model("User",userSchema);



app.get("/",function(req,res){
  res.render("login");
})
app.get("/register",function(req,res){
  res.render("register");
})
app.get("/tickets",function(req,res){
  res.render("tickets");
})
app.get("/projects",function(req,res){
  res.render("projects");
})
app.get("/about",function(req,res){
  res.render("about",{aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact",{contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose");
})



// app.get("/compose/:projectName",function(req,res) {
//   const projectName = _.lowerCase(req.params.projectName);
  
//   // posts.forEach(function(post){
//   //   const storedTitle = _.lowerCase(post.title);
//   //   if(storedTitle === requestedTitle){
//   //     res.render("",{})
//   //   }
//   // })
// });


// app.get("/projects/:projectName",function(req,res){
//   const requestedTitle = _.lowerCase(req.params.projectName);

//   // posts.forEach(function(post){
//   //   const storedTitle = _.lowerCase(post.title);
//   //   if(storedTitle === requestedTitle){
//   //     res.render("post",{post})
//   //   }
//   // })
// });

app.post("/compose",function(req,res){
var report={
  title : req.body.title,
  description : req.body.description,
  tickets : tickets=[]
};
// posts.push(report);
res.redirect("/")
});

app.post("/register",function(req,res){  
  const newUser = new User({
    email    : req.body.username,
    password : req.body.password
  })
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("projects");
    }
  });
});

app.post("/", function(req,res){
  const username =req.body.username;
  const password = req.body.password;

  User.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("projects");
        }else{
          console.log("Wrong password");
        }
      }else{
        console.log("Error");
      }
    }
  });
});


app.listen(process.env.PORT||3000, function(){
  console.log("server started on port 3000");
 })