const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/registration";

const connectToMongo = ()=>{
    mongoose.connect(MONGO_URI,()=>{
        try {
            console.log("successfully connected to Mongo DB");
        } catch (error) {
            console.error("connection failed");
        }
    })
}

module.exports = connectToMongo;