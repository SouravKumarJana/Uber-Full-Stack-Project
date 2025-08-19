const rideModel = require('../models/ride.model');
const rideService = require('../services/ride.service');
const {validationResult, query} = require('express-validator');
const mapService = require('../services/map.service')
const socket = require('../socket');
//const { response } = require('express');


module.exports.createRide = async (req , res , next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }

    const {user, pickUp, destination, vehicleType} = req.body;

    try {
        
        const ride = await rideService.createRide({user : req.user._id, pickUp, destination, vehicleType});
        //console.log(ride);
        res.status(201).json(ride)

        const pickUpCoordinates = await mapService.getAddressCoordinate(pickUp);

        const captainsInRadius = await mapService.getCaptainsInTheRadius( pickUpCoordinates.lat, pickUpCoordinates.lng, 3);

        ride.otp = "";

        const rideUserInfo = await rideModel.findOne({_id: ride._id}).populate('user')
        captainsInRadius.map(captain =>{
            
            socket.sendMessageToSocketId(captain.socketId,{event: 'new-ride-available', data: rideUserInfo})
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports.getFare = async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {pickUp, destination} = req.query

    try {
        const fare = await rideService.getFare(pickUp, destination);
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports.confirmRide = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {rideId} = req.body;

    try {

        const confirmRideInfo = await rideService.confirmRide({rideId, captain: req.captain});

        socket.sendMessageToSocketId(confirmRideInfo.user.socketId,{
            event:'ride-confirmed',
            data: confirmRideInfo
        })

        res.status(200).json(confirmRideInfo)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

module.exports.startRide = async (req, res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {rideId, otp} = req.query;

    try {
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});
        //console.log(ride)
        socket.sendMessageToSocketId(ride.user.socketId,{
            event:'start-ride',
            data: ride
        })

        res.status(200).json(ride)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}


module.exports.endRide = async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await rideService.endRide({rideId, captain: req.captain});

        socket.sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-end',
            data: ride
        })
        res.status(200).json(ride)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}