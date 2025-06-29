const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        fullname:{
            firstname:{
                type: String,
                require: true,
                minlength: [3, "First name must be atleast 3 charchters long"] 
            },
            lastname:{
                type: String,
                minlength: [2, "Last name must be atleast 2 charchters long"] 
            }
        },
        email:{
            type: String,
            require: true,
            minlength: [6, "Email must be atleast 6 charchters long"]
        },
        password:{
            type: String,
            require: true,
            select: false    // when you find this user , the pasword field not pass 
        },
        socketId:{
            type: String
        }
    },{timestamps: true}
)


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign( {_id: this._id}, process.env.JWT_SECRET )
    return token;
}

userSchema.statics.hashPassword = async function (password) {    //In Mongoose, statics is used to define static methods on a schema, which are methods that can be called directly on the model (not on individual documents).
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;