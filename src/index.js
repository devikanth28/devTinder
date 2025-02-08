// console.log("starting a new Project, welcome to DevTinder");
const express = require("express");
const {adminAuth} = require("./middileware/auth");
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user');
const {vallidateSignUpData} = require('./utils/validation')
app.use(express.json());
const bcrypt = require("bcrypt");
const { isPassportNumber } = require("validator");

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


// route handler signature is like

// app.use("/route", rH1, rH2, rH3, rH4, rH5);

app.use("/multiRequest", (req, res, next)=>{
    console.log("first Request");
    // res.send("First Request");
    next();
},

(req, res)=>{
    console.log("2nd Request");
    res.send("2nd Request")
}

);

// app.use("/admin", (req, res, next)=>{
//     console.log("Admin auth is going to check")
//     const token = "ZXY";
//     const isAuth = token === "ZXY";
//     if(!isAuth){
//         res.status(401).send("unauthrized");
//     }
//     else{
//         next()
//     }
// });

app.use("/admin", adminAuth)


app.get("/admin/getAllData", (req, res)=>{

    // const token = "ABC";
    // const isAuthrized = token === "ABC";
    // if(isAuthrized){
    //     res.send("get all data")
    // }
    // else{
    //     res.status(401).send("not authrized")
    // }
    res.send("get all Data")

});


app.post("/signup", async (req, res)=>{
    // console.log("req",req.body);
    // res.send("Devikanth")
    // const userObj = {
    //     firstName:"Ms Dhoni",
    //     lastName:"Kanth",
    //     emailId:"dhoni@gmail.com",
    //     password:"doni12345"
    // }

    try { 
        //validation
        vallidateSignUpData(req);


        //encrypt the password
        const {password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("passwordHash", passwordHash)
        // {firstName, lastName, emailId, password:passwordHash}
        const user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailId:req.body.emailId,
            password:passwordHash
        });
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(404).send(err.message)
    }
});

app.get("/email", async (req, res) => {
    const userEmail = req.body.emailId;
    
    try {

        const user = await User.find({ emailId: userEmail });
        if(user.length == 0){
            res.status(404).send("user not found")
        }
        else{

            res.send(user)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//if you want visit the methodss go to the mongoose docs api model

app.get("/feed", async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users)
    }
    catch(err){
        console.log("something  went wrong")
    }
});

app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;

    try{
        const userId = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(404).send("not able to find id");
    }
})

app.post("/login", async (req, res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.find({emailId: emailId});
        // console.log("USER", user);
        //res.send("user fetched")
        if(!user){
            throw new Error("EmailID is not present in DB");
            
        }
        
        const ispasswordValid = await bcrypt.compare(password, user[0].password);
        console.log("ispasswordvalid", ispasswordValid);
        if(ispasswordValid){
            res.send("login successfulll");
        }
        else{
            res.send("password is not valid");
        }


    } catch(err){
        res.send(400).send("Error",err.message);
    }
})


connectDB().then(()=>{
    console.log("connection happend");
    app.listen(7777, ()=>{
        console.log("server successfully listening on port 3003")
    })
}).catch((err)=>{
    console.log("Database canot be connected")
})

