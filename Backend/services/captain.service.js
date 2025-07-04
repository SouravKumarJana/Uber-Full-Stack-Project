const captainModel = require('../models/captain.model');

module.exports.createCaptain = async function({firstname, lastname, email, password, color, plate, capacity, vehicleType, model }){
    
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType || !model ){
        throw new Error("All fields are required");
    }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType,
            model
        }
    })

    return captain;
}