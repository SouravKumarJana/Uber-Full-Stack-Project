const express = require('express');

const router = express.Router();

const { body } = require('express-validator');  // for validation check the data come from frontend

const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),       // Here we check the validation
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long ")
],
    userController.registerUser)             // if there are any error message is present in above array, then it is handale at userController.registerUser()

module.exports = router;