const router = require('express').Router();

const {getAppointments, sendEmail, makeAppointment, getAllEmployees, getAllServices, signup, login, verifyJWT} = require('../controllers/appController.js');

router.get('/getAppointments', getAppointments);

router.post('/makeAppointment', makeAppointment);

router.get('/getAllEmployees', getAllEmployees);

router.get('/getAllServices', getAllServices);

router.post('/sendEmail',sendEmail);
    
router.post('/signup', signup)

router.post('/login', login)

router.get('/authenticateJWT', verifyJWT)

module.exports = router