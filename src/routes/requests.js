const express = require("express");
const { userAuth } = require("../middileware/auth");
const jwt = require('jsonwebtoken');
const ConnectionRequest = require("../models/connectionRequest");

 
const requestsRouter = express.Router();

requestsRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message:"connection Request Send Successfully",
            data,
        })
    }
    catch(err){
        res.status(404).send("ERROR", err.message);
    }
    res.send(user.firstName + "sent the connection request");
})

module.exports = requestsRouter;