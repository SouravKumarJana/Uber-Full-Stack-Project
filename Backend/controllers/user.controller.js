const User = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req , res, next) =>{
    const errors = validationResult(req);    /* [ body('email').isEmail().withMessage("Invalid Email"),  
                                                  body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
                                                  body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long ") ] */
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password } = req.body;   // if there are no error means all required fields are present 

    const hashedPassword = await User.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();    // create a access token

    res.status(201).json({token, user});       // send token and user-data at response

}
