const router = require("express").Router();

const {
  getAllServices,
  makeService,
  editService,
  deleteService,
} = require("../controllers/serviceController.js");

router.get("/getAllServices", getAllServices);

router.post("/newService", makeService);

router.put("/editService", editService);

router.delete("/deleteService", deleteService);

module.exports = router;
