const { db } = require("./appController.js");

const getAllServices = (req, res) => {
  const query = "SELECT * FROM services";
  console.log("Usao");
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error getting all the services");
    } else {
      console.log("Services retrieved successfully");
      return res.status(200).json(result);
    }
  });
};
const makeService = (req, res) => {
  const query =
    "INSERT INTO services (Service_Name, Cost, Description) VALUES (?, ?, ?)";
  const values = [req.body.serviceName, req.body.cost, req.body.description];

  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting service");
    } else {
      console.log("Service inserted successfully");
      return res.status(200).send("success");
    }
  });
};
const editService = (req, res) => {
  const query =
    "UPDATE services SET Service_Name = ?, Cost = ?, Description = ? WHERE ServiceID = ?";
  const values = [
    req.body.serviceName,
    req.body.cost,
    req.body.description,
    req.body.id,
  ];
  db.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error updating blog");
    } else {
      console.log("Succesfuly update record in services table");
      return res.status(200).send("success");
    }
  });
};
const deleteService = (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM services WHERE ServiceID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error deleting service:", err);
      return res.status(500).send("Error deleting service");
    } else {
      console.log("Successfully deleted service");
      return res.status(200).send("success");
    }
  });
};

module.exports = {
  getAllServices,
  makeService,
  editService,
  deleteService,
};
