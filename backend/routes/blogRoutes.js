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
  getAllBlogs,
  makeBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController.js");

router.get("/getAllBlogs", getAllBlogs);

router.post("/makeNewBlog", upload.single("image"), makeBlog);

router.post("/editBlog", upload.single("image"), editBlog);

router.delete("/deleteBlog", deleteBlog);

module.exports = router;
