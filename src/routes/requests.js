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
});

requestsRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => { 
      try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        console.log("req.params",req.params);
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ messaage: "Status not allowed!" });
        }
  
        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          toUserId: loggedInUser._id,
          status: "interested",
        });
        if (!connectionRequest) {
          return res
            .status(404)
            .json({ message: "Connection request not found" });
        }
  
        connectionRequest.status = status;
  
        const data = await connectionRequest.save();
  
        res.json({ message: "Connection request " + status, data });
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    }
  );

module.exports = requestsRouter;