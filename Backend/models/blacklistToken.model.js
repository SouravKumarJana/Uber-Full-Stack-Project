const mongoose = require('mongoose');

// Here we create blacklistSchema because : we want that ->  after logout, the token will save blcklistTokenSchema for 24 hour 
/* because : After logout , somehow (if you save the token at local storage before logout) you have  the access token, 
then you can access the user profile if the token will not expire (the token expiry time is 1d (TOKEN_EXPIRY)) , 
to avoid this we send the token at blacklistTokenModel after logout , 
so that we can check the token is blacklisted or not (means logout or not) when we try to access the user through token */

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hour
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);