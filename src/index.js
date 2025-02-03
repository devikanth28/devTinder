// console.log("starting a new Project, welcome to DevTinder");
const express = require("express");

const app = express();

app.use("/test", (req, res)=>{
    res.send(" Namaste Devikanth")
})

app.listen(7777, ()=>{
    console.log("server successfully listening on port 3003")
})