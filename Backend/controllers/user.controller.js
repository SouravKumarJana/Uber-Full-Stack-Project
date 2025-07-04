const User = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req , res, next) =>{
    const errors = validationResult(req);    /* [ body('email').isEmail().withMessage("Invalid Email"),  
                                                  body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
                                                  body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long ") ] */
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password } = req.body;   // if there are no error means all required fields are present 

    const isUserAlreadyExist = await User.findOne({email});
    
    if(isUserAlreadyExist){
        return res.status(400).json({message: "User is already exist"});
    }

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


module.exports.loginUser = async(req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password')  // Here we try to check the email (that given by the user at login time ) is present or not in database  // findOne gives the all field of the User which email is the email that the user will give at time of login
                                                                 // as at password field of User-model -> select: false , so password not come by-default , so ".select('+password')" is needed                                                          
    if(!user) {
        return res.status(401).json({ message: "Invalid Email or Password"});
    }
    // if user(email) is valid, then let's check password is correct or not :
    
    const isMatchPassword =  await user.comparePassword(password);
    
    if(!isMatchPassword){
        return res.status(401).json({ message: "Invalid Email or Password"});
    }     
    
    
    const token = user.generateAuthToken();
    const options = {
        httpOnly: true,          // we only modify the cookie at server cant modify at frontend
        secure: true
    }

    res.cookie('token', token, options);                // set the token at cookie
    res.status(200).json({ token, user });

}


module.exports.getUserProfile = async(req, res, next) =>{
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.user);
    res.status(200).json(req.user);
}


module.exports.logoutUser = async(req, res, next) =>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    res.clearCookie('token');                         // clear the token property from cookie
    
    await BlacklistTokenModel.create({token});    // Here actually  we  send the token at blacklistTokenModel
    
    res.status(200).json({message: 'Logged out'});  // now show the loggedout message
}
