const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next)=> {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];     //fetch the jwt-token either from cookies or the Authorization header  // actually at header token is like : bearer bxhizbusgub
   
    /*you set the cookie on the client by sending it in the response:
         res.cookie('token', token);
    The browser stores the cookie, and automatically sends it back with future requests to the same domain.

    On the next request, the token is available in req.cookies:
         const token = req.cookies.token;*/

    if(!token){
        return res.status(401).json({message: "Unauthorized User"});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token: token});  // check the token is blacklisted or not
    
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized User'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   // it gives the payload (here payload is : _id , because when we create token we did : jwt.sign({_id: this._id})  )
        
        const user = await User.findById(decoded?._id);

        req.user = user;   //"req" is the HTTP request object used in Express.  // ".user" is a custom property being added to the request object.
                           // This way, you don’t need to decode the token again in every route — the middleware handles that once and makes the user object available via req.user.
        
        return next();     //Calling it tells Express to move on to the next middleware or route handler in the request-response cycle.
                           //return ensures that no further code in the current middleware is executed after calling next(). This avoids unintended logic running after next().

    }catch(error){
        return res.status(401).json({message: "Unauthorized User"})
    }
    
}


module.exports.authCaptain = async (req, res, next)=>{

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(200).json({message: "Unauthorized Captain"});
    }
    
    const isBlacklisted = await blacklistTokenModel.findOne({token: token});
    
    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized Captain"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        return next();

    }catch{
        return res.status(401).json({message: "Unauthorized Captain"});
    }
}
