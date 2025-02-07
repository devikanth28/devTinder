const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:100
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:50
        
    },
    gender:{
        type:String,
        // validate(value){
        //     if(["male", "female", "others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    photoUrl:{
        type:String,
        default:"https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg",
    },
    about:{
        type:String,
        default:"this is the default about of the user",
    },
    skills:{
        type:[String]
    },
    timestamps:true,
});

// const userModel = 

module.exports = mongoose.model("User", userSchema);