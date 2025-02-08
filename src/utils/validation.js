const validator = require('validator');

const vallidateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName.length || !lastName){
        throw new Error("Name is not valid");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
        
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter the strong password!")
    }
};

module.exports={
    vallidateSignUpData,
}