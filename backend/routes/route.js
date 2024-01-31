const router = require('express').Router();

const {getAppointments} = require('../controllers/appController.js');
const {makeAppointment} = require('../controllers/appController.js');
const {getAllEmployees} = require('../controllers/appController.js');
const {getAllServices} = require('../controllers/appController.js')

router.get('/getAppointments', getAppointments);

router.post('/makeAppointment', makeAppointment)

router.get('/getAllEmployees', getAllEmployees)

router.get('/getAllServices', (req,res)=>{
})

module.exports = router