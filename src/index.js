
const cookieParser = require("cookie-parser");
const cors = require('cors');
const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches frontend URL
    credentials: true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"], // ✅ Ensure PATCH & OPTIONS are allowed
    // allowedHeaders: ["Content-Type", "Authorization"],

    // preflightContinue: false,
    // optionsSuccessStatus: 204,
}));

// ✅ Explicitly handle OPTIONS requests globally
// ✅ Explicitly Handle OPTIONS Requests
// app.options("*", cors());



// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow specific domain
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS"); // Include PATCH
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
//     console.log("REQ index", req.method);
//     if (req.method === "OPTIONS") {
//       return res.sendStatus(200); // Handle preflight request
//     }
//     next();
//   });

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const http = require("http");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/userRouter") 

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/",userRouter);


//while writing the routes is matter of sequence(order)

// app.get("/user/:userId/:name/:password", userAuth, (req, res)=>{
//     console.log("req",req.params)
//     res.send({firstName:"Devi", lastName:"Kanth"})
// });


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

// app.use("/admin", adminAuth)


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

// app.get("/feed", async (req, res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users)
//     }
//     catch(err){
//         console.log("something  went wrong")
//     }
// });

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

// app.post("/login", async (req, res)=>{
//     try{
//         const {emailId, password} = req.body;
//         const user = await User.find({emailId: emailId});
//         // console.log("USER", user);
//         //res.send("user fetched")
//         if(!user){
//             throw new Error("EmailID is not present in DB");
            
//         }
        
//         const ispasswordValid = await bcrypt.compare(password, user[0].password);
        
//         if(ispasswordValid){

//             const token = await jwt.sign({_id:user[0]._id}, "DEV@Tinder$790");
//             console.log("token", token);

//             res.cookie("token", token);
//             res.send("login successfulll");
//         }
//         else{
//             res.send("password is not valid");
//         }


//     } catch(err){
//         res.send(400).send("Error",err.message);
//     }
// })


// app.get("/profile", userAuth, async (req, res) => {
//     // const cookies = req.cookies;
//     // console.log("COOOOO", cookies);
//     // if (!cookies || !cookies.token) {
//     //     return res.status(401).send("Unauthorized: No token provided");
//     // }
    
//     // const token = cookies.token;
//     // console.log("token", token);

//     try {
//         const user = req.user;
//         res.send(user);
//         // if(!user){
//         //     throw new Error("user does not exist");
            
//         // }
//         // const decodedMessage = await jwt.verify(token, "DEVTinder@790");
//         // console.log("DECODEDMESSAGE", decodedMessage);
//         // res.send("Reading cookies");
//     } catch (error) {
//         // console.error("JWT Verification Error:", error.message);
//         // return res.status(403).send("Forbidden: Invalid token");
//         res.status(400).send("ERROR",err.message);
//     }
// });

// create JWT Token




// Add the Token to cookie and the response back to the user


// app.post("/sendConnectionRequest", userAuth, async (req, res)=>{
//     console.log("sending connection request");

//     res.send("Connection Request sent");
// })

connectDB().then(()=>{
    console.log("connection happend");
    app.listen(7777, ()=>{
        console.log("server successfully listening on port 7777")
    })
}).catch((err)=>{
    console.log("Database canot be connected")
})

