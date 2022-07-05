const express = require("express");
const router = express.Router();
const mongo = require("mongoose");

const BlogPostSchema=new mongo.Schema({
    Ques_no: Number,
    title: String,
    body: String,
    date: {
        type:String,
        default:Date.now()
    }
});
    const BlogPost=mongo.model('BlogPost',BlogPostSchema);

router.get("/teacher/info", async (req,res)=>{
    const data =await BlogPost.find({});
    var d=[];
    for(i of data){
        if(i.title !== undefined)
            d.push(i)
        }
        res.json(d);
    });
router.get("/student/info", async (req,res)=>{
        const data =await  BlogPost.find({title: null});
            res.json(data);
        });
router.get("/teacher",(req,res)=>{
        res.render("teacher");
    });
router.get("/student",(req,res)=>{
        res.render("student");
    });
router.post("/teacher",async (req,res)=>{
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    await newBlogPost.save();
    res.redirect("/home/teacher");
});
router.post("/student",async (req,res)=>{
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    await newBlogPost.save();
    res.redirect("/home/student");
});

module.exports = router;