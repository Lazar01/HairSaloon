const router = require("express").Router();

const {
  getAppointments,
  sendEmail,
  makeAppointment,
  getAllEmployees,
  getAllServices,
  signup,
  login,
  verifyJWT,
  getAllBlogs,
  makeBlog,
  editBlog,
} = require("../controllers/appController.js");

router.get("/getAppointments", getAppointments);

router.post("/makeAppointment", makeAppointment);

router.get("/getAllEmployees", getAllEmployees);

router.get("/getAllServices", getAllServices);

router.get("/getAllBlogs", getAllBlogs);

router.post("/makeNewBlog", makeBlog);

router.post("/editBlog", editBlog);

router.post("/sendEmail", sendEmail);

router.post("/signup", signup);

router.post("/login", login);

router.get("/authenticateJWT", verifyJWT);

module.exports = router;
