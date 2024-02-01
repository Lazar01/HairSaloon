const router = require('express').Router();

const {getAppointments, sendEmail, makeAppointment, getAllEmployees, getAllServices} = require('../controllers/appController.js');

router.get('/getAppointments', getAppointments);

router.post('/makeAppointment', makeAppointment);

router.get('/getAllEmployees', getAllEmployees);

router.get('/getAllServices', getAllServices);

router.post('/sendEmail',sendEmail);

module.exports = router