const express = require("express");
const router = express.Router();
const mongo = require("mongoose");

const loginSchema = new mongo.Schema({
    username: String,
    password: String,
    email: String,
    account: String
}); 
const login = mongo.model('logindetails', loginSchema);

router.get("/", (req,res)=>{
	res.render("login", {bool : false});
});

router.get("/signup",(req,res)=>{
	res.render("signup",{t : false, s : false, boo : false, foo : false});
});

router.post("/signup", async (req,res)=>{
	var acc="";
	var teach=false;
	var stu=false;
	const { usnm,Email,pass,cpass } = req.body;
	var data= await login.findOne({username : usnm}) 
	const data1= await login.findOne({email : Email})
	if(usnm === undefined){
		acc="teacher";
		teach=true;
        stu=false;
        data = null;
	}
	else{
		acc="student";
		teach=false;
		stu=true;
	}
	if(data!==null || data1!==null){
        res.render("signup",{t : teach, s : stu, boo : false, foo : true});
		}
	else if(pass!==cpass){
		res.render("signup",{t : teach, s : stu, boo : true, foo : false});
		}
	else{
		const user=new login({username: usnm, email: Email, password: pass, account: acc});
		await user.save();
		res.redirect("/");
		}
	});
	
router.post("/home",async (req,res)=>{
	const { usnm, pass} = req.body;
	const data= await login.findOne({username : usnm, password : pass}) 
	const data1= await login.findOne({email : usnm, password : pass}) 
	if(data!==null || data1!==null){
		if(data == null && data1.account == "teacher"){
			res.redirect("/home/teacher");
			}
		else{
				res.redirect("/home/student")
			}
		}
		else{
				res.render("login", {bool : true});
			}
    });

module.exports = router;