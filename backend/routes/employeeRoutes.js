const router = require("express").Router();

const {
  getAllEmployees,
  createNewEmployee,
  deleteEmployee,
  editEmployee,
} = require("../controllers/employeeController.js");

const multer = require("multer");
const path = require("path");

const storageStaff = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../frontend/assets/BarbersImages"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStaffImages = multer({ storage: storageStaff });

router.get("/getAllEmployees", getAllEmployees);

router.post(
  "/newEmployee",
  uploadStaffImages.single("image"),
  createNewEmployee
);

router.post("/editEmployee", uploadStaffImages.single("image"), editEmployee);

router.delete("/deleteEmployee", deleteEmployee);

module.exports = router;
