
const express=require ("express");
const https =require ("https");
const bodyparser = require("body-parser");
const htttps =require("https");
const app= express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended :true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
  const firstname = req.body.fname;
  const lastname  = req.body.lname;
  const email     = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  }
const jsonData= JSON.stringify(data);
const url ="https://us2.api.mailchimp.com/3.0/lists/06db07c006";

const option ={
  method:"POST",
  auth : "stunnerhash:5818872d9a2c1c6acf6ffe0a631dc2b1-us2"
}
const request = https.request( url , option , function(response){
  if(response.statusCode === 200)
    res.sendFile(__dirname+"/success.html");
  else
   res.sendFile(__dirname+"/failure.html");

  response.on("data" ,function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData)
request.end();
});

app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server started on port 3k");
 })