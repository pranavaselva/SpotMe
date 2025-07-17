const express = require("express");
const app = express();
const {User}  = require("./mongodb");

app.use(express.json());

app.get('/get',(req, res) =>{
    User.find({})
    .then((data) =>{
        res.send(data)
        console.log("Data fetched successfully")
    })
    .catch((error) =>{
        res.status(500).json({error})
    })
});

app.post('/signup', async(req, res) =>{
    // console.log("Signup request received:", req.body);
    try{
        const result = await User.create(req.body);
        res.status(201).json({success:true, data: result})
        // res.send("User created successfully");
    } catch(err) {
        console.error("Error creating user:",err);
        res.status(500).json({success:false, message: "Internal Server Error", error:err.message}) 
    }
});

app.post('/login', async(req, res) =>{
    res.send("Waiitng for data")
    const {email, password} = req.body;
    const details = await User.findOne({email:email, password:password});

    if(!details){
        return res.status(401).json({success:false, message:"Invalid credentials"})
    } else{
        return res.status(200).json({success:true, message:"Login successful", data:details})
    }
})

module.exports = app;