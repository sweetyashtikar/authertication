const express = require('express');
const register = require('../controllers/register');
const login = require('../controllers/login');
const forgetPassword = require('../controllers/forgetPassword');
const verifyOtp = require('../controllers/verifyOtp');
const getOtpTime = require('../controllers/getOtpTime');
const updatedPassword = require('../controllers/passwordUpdate');
const getAccess = require('../controllers/getAcces');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forget/password', forgetPassword);
router.post('/otp/verify', verifyOtp);
router.post('/otp/time', getOtpTime);
router.post('/update/pass', updatedPassword);
router.post('/get/access', getAccess); 

module.exports = router;
