const express = require("express");
const app = express();
const {User}  = require("./mongodb");

app.get('/get',(req, res) =>{
    res.send("Fetching all users...");
    User.find({})
    .then((data) =>{
        res.send(data)
        console.log("Data fetched successfully")
    })
    .catch((error) =>{
        res.json(error)
    })
});

app.post('/signup', async(req, res) =>{
    // console.log("Signup request received:", req.body);
    try{
        const result = await User.create(req.body);
        res.status(201).json({success:true, data: result})
    } catch(err) {
        console.error("Error creating user:",err);
        res.status(500).json({success:false, message: "Internal Server Error", error:err.message}) 
    }
});


module.exports = app;