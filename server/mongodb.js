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

module.exports = dataBaseConnection
console.log("Connecting to:", process.env.DATABASE_URL);

