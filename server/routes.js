const express = require("express");
const app = express();
const {User, Visiter}  = require("./mongodb");

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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();
        console.log("-----------------------------------------");
        console.log("LOGIN ATTEMPT:");
        console.log("Email received:", cleanEmail);
        console.log("Password received:", cleanPassword);
        const details = await User.findOne({ email: email, password: password });

        if (!details) {
            // Send the 'Invalid credentials' response
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        } else {
            // Or send the 'Login successful' response
            return res.status(200).json({ success: true, message: "Login successful", data: details });
        }
    } catch (error) {
        // Always good to have a try...catch for async operations
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post('/location', async (req, res) => {
    try {
      const { ip, location } = req.body;
  
      if ( !token || !location || location.lat == null || location.lon == null) {
        return res.status(400).json({ error: 'Token, Latitude, Longitude are required' });
      }
  
      const visiter = new Visiter({
        token,
        ip,
        location
      });
  
      await visiter.save();
      console.log(`stored location for token: ${token}`);
      res.status(200).json({ message: 'Location saved' });
    } catch (error) {
      console.error("Error saving location:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/location/:token', async (req, res)=>{
    try{
      const token = req.params.token;
      const locationData = await Visiter.findOne({ token : token });

      if(locationData){
        console.log(`Found and sent location for token: ${token}`);
        res.json(locationData);
      }else{
        console.log(`No location found yet for token: ${token}`);
        res.status(404).json({error: "Location not found for this token."});
      }
    }
    catch(error){
      console.error("Error retrieving location:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  
module.exports = app;