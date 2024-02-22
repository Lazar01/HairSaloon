const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../frontend/assets/BlogImages"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

router.post("/makeNewBlog", upload.single("image"), makeBlog);

router.post("/editBlog", editBlog);

router.post("/sendEmail", sendEmail);

router.post("/signup", signup);

router.post("/login", login);

router.get("/authenticateJWT", verifyJWT);

module.exports = router;
