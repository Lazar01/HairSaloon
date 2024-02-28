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
  deleteBlog,
  editService,
  deleteService,
  makeService,
  createNewEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/appController.js");

router.get("/getAppointments", getAppointments);

router.post("/makeAppointment", makeAppointment);

router.get("/getAllEmployees", getAllEmployees);

router.post("/newEmployee", createNewEmployee);

router.put("/editEmployee", editEmployee);

router.delete("/deleteEmployee", deleteEmployee);

router.get("/getAllServices", getAllServices);

router.post("/newService", makeService);

router.put("/editService", editService);

router.delete("/deleteService", deleteService);

router.get("/getAllBlogs", getAllBlogs);

router.post("/makeNewBlog", upload.single("image"), makeBlog);

router.post("/editBlog", upload.single("image"), editBlog);

router.delete("/deleteBlog", deleteBlog);

router.post("/sendEmail", sendEmail);

router.post("/signup", signup);

router.post("/login", login);

router.get("/authenticateJWT", verifyJWT);

module.exports = router;
