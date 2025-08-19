const mongoose = require('mongoose');


// function connectToDB(){
//     mongoose.connect(process.env.DB_CONNECT)
//     .then(() =>{
//         console.log('Connect To Db');
//     }).catch(error =>{
//         console.log('MongoDb connection Failed',error);
//     });
// }

const connectToDB = async () =>{
    try {
        const connectionInstace = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDb is connected !! DB HOST: ${connectionInstace.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED" , error);
        process.exit(1)
    }
}

module.exports = connectToDB;