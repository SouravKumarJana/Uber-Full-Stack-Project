const axios= require('axios');
const { urlencoded } = require('express');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async(address)=>{
    const apikey = process.env.GO_MAPS_API
    
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?key=${apikey}&address=${encodeURIComponent(address)}`;
    //const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url)

        if(response.data.status === 'OK' && response.data.results.length > 0 ){
            const location = response.data.results[0].geometry.location;
            return{
                lat: location.lat,
                lng: location.lng
            }
            
        }
        else{
            throw new Error('Unable to fetch the coordinate')
        }
    } catch (error) {
        //console.error(error)
        throw error
    }
}

module.exports.getDistance_Time = async (origin, destination)=>{

    if(!origin && !destination){
        throw new Error('Origin and Destination are required');
    }

    const apikey = process.env.GO_MAPS_API;

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${apikey}`

    try {
        
        const response = await axios.get(url)

        if(response.data.status === 'OK'){

            if(response.data.rows[0].elements[0]==='ZERO_RESULT'){
                throw new Error('Not routes found');
            }
            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('Unable to fetch Distace & Time');
        }
    } catch (error) {
        throw error;
    }
}

module.exports.get_AutoCompleteSuggestions = async (input) =>{
    if(!input){
        throw new Error('Input is required');
    }

    const apikey = process.env.GO_MAPS_API;

    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`

    try {
        
        const response = await axios.get(url);

        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch Suggestions');

        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw new Error('Failed to fetch autocomplete suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius)=>{    //try to find the captains who are present in nearest(Within the "radius" of PickUp Location) the pickUp location

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lat, lng ], radius / 6371 ]   // radius in km  // 6371 km is the approximate radius of the Earth
            }
        }
    });

    return captains;
}