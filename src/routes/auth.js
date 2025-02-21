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


authRouter.post("/login", async (req, res) => {
    try {
    console.log("REQ", req.body);
      
      const { emailId, password } = req.body;
      // console.log("emailID", emailId, password)
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        const token = await user.getJWT();
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send(user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

authRouter.post('/logout', async (req, res)=>{
    res.cookie("token", null, {
        expires:new Date(Date.now())
    });
    res.send();
})



module.exports  = authRouter;