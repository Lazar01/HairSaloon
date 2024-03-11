const { db } = require("./appController.js");

const getAllEmployees = (req, res) => {
  const query =
    "SELECT a.EmployeeID, a.Name, a.Address, a.Image, JSON_OBJECTAGG(COALESCE(a.Date, ''), a.Time) AS Schedule FROM (SELECT employee.EmployeeID, Name, Address, Image, Date, GROUP_CONCAT(Time) AS Time FROM employee LEFT JOIN appointments ON employee.EmployeeID = appointments.EmployeeID AND appointments.Date > CURRENT_DATE() GROUP BY employee.EmployeeID, employee.Name, employee.Address, employee.Image, appointments.Date) AS a GROUP BY a.EmployeeID, a.Name, a.Address, a.Image ORDER BY a.EmployeeID LIMIT 0, 1000;";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error getting all the employees");
    } else {
      console.log("Succesfuly retrieved emplooyes!");
      return res.status(200).json(result);
    }
  });
};

const createNewEmployee = (req, res) => {
  const query = "INSERT INTO employee (Name, Address, Image) VALUES (?, ?, ?)";
  const imageFileName = req.file ? req.file.filename : null;
  const values = [req.body.name, req.body.address, imageFileName];

  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting employee: ", error);
    } else {
      console.log("Employee inserted successfully");
      return res.status(200).send("success");
    }
  });
};
const editEmployee = (req, res) => {
  let query = "";
  let values = [];
  const imageFileName = req.file ? req.file.filename : null;
  console.log(req.file);
  if (req.file) {
    query =
      "UPDATE employee SET Name = ?, Address = ?, Image = ? WHERE EmployeeID=?";
    values = [req.body.name, req.body.address, imageFileName, req.body.id];
  } else {
    query = "UPDATE employee SET Name = ?, Address = ? WHERE EmployeeID=?";
    values = [req.body.name, req.body.address, req.body.id];
  }
  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error updating employee");
    } else {
      console.log("Employee updated successfully");
      return res.status(200).send("success");
    }
  });
};
const deleteEmployee = (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM employee WHERE EmployeeID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error deleting employee");
      return res.status(500).send("Error deleting employee");
    } else {
      console.log("Successfully deleted blog");
      return res.status(200).send("success");
    }
  });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  editEmployee,
  deleteEmployee,
};
