const router = require("express").Router();

const {
  sendEmail,
  signup,
  login,
  verifyJWT,
} = require("../controllers/appController.js");

const blogRoutes = require("./blogRoutes");
const appointmentRoutes = require("./appointmentRoutes.js");
const serviceRoutes = require("./serviceRoutes.js");
const employeeRoutes = require("./employeeRoutes.js");
const userRoutes = require("./userRoutes.js");

router.post("/sendEmail", sendEmail);

router.post("/signup", signup);

router.post("/login", login);

router.get("/authenticateJWT", verifyJWT);

router.use(blogRoutes);
router.use(appointmentRoutes);
router.use(serviceRoutes);
router.use(employeeRoutes);
router.use(userRoutes);

module.exports = router;
