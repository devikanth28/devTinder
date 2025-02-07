const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Devikanth:NBBIu9xNOdGue9aZ@namastenode.ctawv.mongodb.net/devTinder');
};

// connectDB().then(()=>{
//     console.log("connection establised");
// }).catch(err => {
//     console.error("Database connection failed")
// })

module.exports = connectDB;