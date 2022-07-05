const express= require("express");
const app= express();
const mongo= require("mongoose");
const start= require("./routes/start");
const home= require("./routes/home");
const fileupload= require("express-fileupload");
const cookies= require("cookie-parser");

app.set('view engine','ejs');

mongo.connect("mongodb://localhost:27017/login",{useNewUrlParser : true, useUnifiedTopology : true});

app.use(cookies());
app.use(fileupload());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use("/",start);
app.use("/home",home);
app.get("/cookie",(req,res)=>{
	res.clearCookie(req.cookies);
	console.log(req.cookies);
});
app.listen(3000,()=>{
	console.log("server Listneing at port 3000");
	});