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

app.post('/location', async (req, res) => {
    try {
      const { ip, location } = req.body;
  
      if (!location || location.lat == null || location.lon == null) {
        return res.status(400).json({ error: 'Latitude and Longitude required' });
      }
  
      const visiter = new Visiter({
        ip,
        location
      });
  
      await visiter.save();
      res.status(200).json({ message: 'Location saved' });
    } catch (error) {
      console.error("Error saving location:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.get('/location/:token', async(req,res) =>{
    const {token} = req.params;
    try{
        const record = await Visiter.findOne({token}).sort({accessedAt: -1});

        if(!record){
            return res.status(404).json({error: "No location found for this token."});
        }

        const {location, accessedAt} = record;
        res.json({
            location,
            accessedAt
        });
    }catch(error){
        console.error("Get location error:", error);
        res.status(500).json({error:"Server error while fetching Records."})
    }
})

module.exports = app;