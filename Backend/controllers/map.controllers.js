const mapService = require('../services/map.service')
const {validationResult} = require('express-validator')


module.exports.getCoordinates = async(req, res, next)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {address} = req.query;

    try {
        const coordinate = await mapService.getAddressCoordinate(address);
        //console.log(coordinate);
        res.status(200).json(coordinate);

    } catch (error) {
        res.status(404).json({message: 'Coordinate of this Address is not found' });
    }
}


module.exports.getDistanceTime = async(req, res, next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {origin, destination} = req.query;
    try {
        
        const distanceTime = await mapService.getDistance_Time(origin, destination);

        res.status(200).json(distanceTime);

    } catch (error) {
        res.status(500).json({message: 'Internal Server Errror'})
    }

}


module.exports.getAutoCompleteSuggestions = async (req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({errors: errors.array()});
    }

    const {input} = req.query;

    try {

        const suggestions = await mapService.get_AutoCompleteSuggestions(input);
        res.status(200).json(suggestions);

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}