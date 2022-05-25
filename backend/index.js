const express = require("express");
var cors = require('cors')
const connectToMongo = require("./db/db");

const port = process.env.PORT || 5000;
const app = express();
connectToMongo();
app.use(cors())
app.use(express.json());
// Available Routes
app.use("/auth",require("./routes/authentication"))

app.listen(port,()=>{
    console.log(`application started at port number ${port}`);
});