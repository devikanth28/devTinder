const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require("jsonwebtoken"); 


const authRouter = express.Router();

authRouter.post("/signup", async (req, res)=>{
    console.log("/signup", req.body);
    try { 
        
        validateSignUpData(req);


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


authRouter.post("/login", async (req, res)=>{
    // console.log("REQ", req.body)
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        console.log("USER", user);
        //res.send("user fetched")
        if(!user){
            throw new Error("EmailID is not present in DB");
            res.status(404).send("EmailID is not present in DB");
            
        }
        
        const ispasswordValid = await bcrypt.compare(password, user[0].password);
        if(ispasswordValid){
            // console.log("ispasswordValid", ispasswordValid)

            const token = await jwt.sign({_id:user[0]._id}, "DEV@Tinder$790");
            console.log("token", token);

            res.cookie("token", token);
            res.send("login successfulll");
        }
        else{
            res.send("password is not valid");
        }


    } catch(err){
        res.sendStatus(400);
    }
});

authRouter.post('/logout', async (req, res)=>{
    res.cookie("token", null, {
        expires:new Date(Date.now())
    });
    res.send();
})



module.exports  = authRouter;