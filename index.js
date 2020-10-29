
 //npm init
//npm install express body-parser
//git add .
//git commit -m "string"
//git push heroku master
const express= require("express");
const bodyParser=require("body-parser");

const app=express();
app.set('view engine','ejs');

app.set(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.render("list",{kindofday : 6});
});

app.post("/", function(req,res){
   console.log(req.body.item);
});

app.listen(5050,function(){
  console.log("server started on port 5050");
});

