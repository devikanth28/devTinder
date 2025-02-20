const express = require('express');
const { userAuth } = require('../middileware/auth');
const user = require('../models/user');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async(req, res)=>{
    try{
        const user = req.user;

        res.send(user);
    }catch(err){
        res.status(404).send("ERROR: "+err.message);
    }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
    
})

module.exports = profileRouter;