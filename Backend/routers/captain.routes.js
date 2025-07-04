const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 5}).withMessage("Password must be atleast 5 charchters long"),
    body('vehicle.color').isLength({min: 3}).withMessage("vehicle-color must be atleast 3 charchters long"),
    body('vehicle.plate').isLength({min: 5}).withMessage("vehicle plate number must be atleast 5 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle', 'auto']).withMessage("Invalied vehicle-type"),
    body('vehicle.model').isLength({min: 4}).withMessage("vehicle-model must be at least 4 characters long")
],
    captainController.registerCaptain
)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 5}).withMessage("Password must be atleast 5 charchters long")
],
    captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;