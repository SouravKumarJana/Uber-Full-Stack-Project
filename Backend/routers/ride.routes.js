const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const rideController = require('../controllers/ride.controllers')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create-ride',
    authMiddleware.authUser,
    //body('userId').isString().isLength({min: 24}).withMessage('Invalid User Id'),
    body('pickUp').isString().isLength({min: 3}).withMessage('Invalid PickUp Location'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Location'),
    body('vehicleType').isString().isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
,
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickUp').isString().isLength({min: 3}).withMessage('Invalid pickUp Location'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid Dstination Location'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invallid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.endRide
)

module.exports = router;