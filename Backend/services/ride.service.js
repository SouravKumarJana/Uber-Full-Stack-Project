const rideModel = require('../models/ride.model');
const { findOneAndUpdate } = require('../models/user.model');
const mapService = require('./map.service');
const crypto = require('crypto')


let distanceTime;
const getFare = async (pickUp , destination) =>{

    if(!pickUp || !destination){
        throw new Error ('pickUp and destination is required');
    }
    distanceTime = await mapService.getDistance_Time(pickUp, destination);

    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle:20
    }

    const perKmRate = {
        car: 13,
        auto: 9,
        motorcycle: 5
    }

    const perMinuteRate = {
        car: 3,
        auto: 2,
        motorcycle: 1
    }

    const fare = {
        car: Math.round( baseFare.car + ( (distanceTime.distance.value/1000) * perKmRate.car ) + ((distanceTime.duration.value/60) * perMinuteRate.car)),
        auto: Math.round( baseFare.auto + ( (distanceTime.distance.value/1000) * perKmRate.auto ) + ((distanceTime.duration.value/60) * perMinuteRate.auto)),
        motorcycle: Math.round( baseFare.motorcycle + ( (distanceTime.distance.value/1000) * perKmRate.motorcycle ) + ((distanceTime.duration.value/60) * perMinuteRate.motorcycle))

    }

    return fare;
}

module.exports.getFare = getFare

function getOtp (num){
    const otp = crypto.randomInt( Math.pow(10, num-1), Math.pow(10, num) ).toString();
        return otp;
}

module.exports.createRide = async ({user, pickUp, destination, vehicleType}) =>{
    
    if(!user || !pickUp || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickUp, destination);

    const ride = await rideModel.create({
        user,
        pickUp,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6),
        distance: (distanceTime.distance.value/1000).toFixed(1)
    })
    return ride;
}

module.exports.confirmRide = async({rideId, captain}) =>{

    if(!rideId){
        throw new Error('rideId is required');
    }

    await rideModel.findOneAndUpdate({_id: rideId},{
            status:'accepted',
            captain:captain._id
        }
    )
    
    const confirmRideInfo = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');

    if(!confirmRideInfo){
        throw new Error('ConfirmRideInfo is not found')
    }
    return confirmRideInfo;

}

module.exports.startRide = async({rideId, otp, captain})=>{

    if(!rideId || !otp){
        throw new Error('ride Id and otp is required')
    }

    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('ride is not found')
    }
    if(ride.status !== 'accepted'){
        throw new Error('ride is not accepted')
    }

    if(otp !== ride.otp){
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({_id: rideId},{
        status:'ongoing'
    })

    return ride;

}

module.exports.endRide = async({rideId, captain}) =>{

    if(!rideId){
        throw new Error('ride Id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,                            // if two are match then fetch
        captain: captain._id
    }).populate('user').populate('captain');

    if(!ride){
        throw new Error('ride is not found');
    }

    if(ride.status !== 'ongoing'){
        throw new Error('ride status is not ongoing till now');
    }

    await rideModel.findOneAndUpdate({_id: rideId},{
        status: 'completed'
    })

    return ride;
}