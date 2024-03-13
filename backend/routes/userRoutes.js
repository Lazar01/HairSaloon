const router = require("express").Router();

const { editUserProfile } = require("../controllers/userController");

router.put("/editUserProfile", editUserProfile);

module.exports = router;
