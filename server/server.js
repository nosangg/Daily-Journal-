const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

//get driver connection
const db = require("./db/conn");

app.listen(port, ()=>{
    db.connectToServer((err)=>{
        if(err) console.log(err)
    })

    console.log("app listening on "+ port)
})