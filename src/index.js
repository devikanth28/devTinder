// console.log("starting a new Project, welcome to DevTinder");
const express = require("express");

const app = express();

//while writing the routes is matter of sequence(order)

app.get("/user/:userId/:name/:password", (req, res)=>{
    console.log("req",req.params)
    res.send({firstName:"Devi", lastName:"Kanth"})
});


app.post("/user", (req, res)=>{
    console.log("Save The Data Successfully", req.query);
    res.send("Data Saved")
})



//this will match all the HTTP method API calls to test
app.use("/test", (req, res)=>{
    res.send(" Namaste Devikanth")
});

// app.use("/hello/2", (req, res)=>{
//     res.send("hello/2")
// });

// app.use("/hello", (req, res)=>{
//     res.send("Devikanthhh");
// });



app.listen(7777, ()=>{
    console.log("server successfully listening on port 3003")
})