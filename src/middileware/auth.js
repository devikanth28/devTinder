const adminAuth = (req, res, next) =>{
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthrized = token === "xyz";
    if(!isAdminAuthrized){
        res.status(401).send("Unauthrized");
    }else{
        next();
    }
};

module.exports = {
    adminAuth
}
