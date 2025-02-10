const express = require("express");
const { userAuth } = require("../middileware/auth");
const jwt = require('jsonwebtoken');

 
const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequests", userAuth, async(req, res)=>{
    const user = req.user;

    console.log("sending connection request");
    res.send(user.firstName + "sent the connection request");
})

module.exports = requestsRouter;