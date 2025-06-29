const User = require('../models/user.model');

module.exports.createUser = async ({firstname, lastname, email, password}) =>{
    if(!firstname || !email || !password){
        throw new Error("all fields (Firstname, Email, Password) are required")
    }
    const user = User.create({      // "User" from  userModel
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}