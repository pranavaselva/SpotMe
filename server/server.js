const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const cors = require("cors")
const dotenv = require("dotenv")
const {dataBaseConnection} = require('./mongodb')

dotenv.config()  // Load environment variables here, ensures it’s available everywhere

const app = express()

app.use(cors(
   { origin: ["https://spot-me-three.vercel.app", "http://localhost:5173"], // Allow your Vercel app AND local testing
  credentials: true}
))
app.use(express.json())
app.use("/",routes)


app.get('/', (req, res) => {
    res.send("backend is running")
})

dataBaseConnection();  // Connect to MongoDB

app.listen(3000, () => {
    console.log("App is running on port 3000")
})
