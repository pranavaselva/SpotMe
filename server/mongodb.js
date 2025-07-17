const mongoose  = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()  // Load .env file before using process.env


function dataBaseConnection() {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connection successful")
    }).catch((error) => {
        console.log("Connection failed")
        console.log(error)
    })
}

const userSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Email: String,
    Password: String,
})

const visiterSchema  = new mongoose.Schema({
    ip : {
        type : String,
        required : true,
    },
    location : {
        lat: {
            type: Number,
            required : true,
        },
        lon : {
            type : Number,
            required : true,
        },
    },
    accessedAt : {
        type : Date,
        default : Date.now,
    }
});


const User =  mongoose.model("User", userSchema)
const Visiter =  new mongoose.model("Visiter", visiterSchema)

module.exports = { dataBaseConnection, User, Visiter};