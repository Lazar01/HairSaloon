const {
  getAppointments,
  makeAppointment,
} = require("../controllers/appointmentController.js");

const router = require("express").Router();

router.get("/getAppointments", getAppointments);

router.post("/makeAppointment", makeAppointment);

module.exports = router;
