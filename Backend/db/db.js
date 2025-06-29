const mongoose = require('mongoose');


function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() =>{
        console.log('Connect To Db');
    }).catch(error =>{
        console.log('MongoDb connection Failed',error);
    });
}

module.exports = connectToDB;