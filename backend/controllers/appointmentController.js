const { db } = require("./appController.js");
const { userVerification } = require("./appController.js");
function insertAppointment(req, res) {
  const query =
    "INSERT INTO appointments (Time, Date, EmployeeID, CustomerID) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.time,
    req.body.date,
    req.body.employeeID,
    req.body.customerID,
  ];
  if (req.body.time == "") {
    return res.status(200).send("time");
  }
  if (req.body.EmployeeID == "") {
    return res.status(200).send("employee");
  }
  if (req.body.date == "") {
    return res.status(200).send("date");
  }
  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json("Error inserting appointment");
    } else {
      console.log("Appointment inserted successfully");
      return res.status(200).json("success");
    }
  });
}

const getAppointments = async (req, res) => {
  const { CustomerID, UserRole } = req.query;
  let query = `SELECT customer.Name,Date,Time, employee.Name as BarberName FROM appointments INNER JOIN employee ON employee.EmployeeID = appointments.EmployeeID INNER JOIN customer ON appointments.CustomerID = customer.CustomerID WHERE Date>current_date() AND appointments.CustomerID = ? ;`;
  if (UserRole == "admin")
    query =
      "SELECT customer.Name,Date,Time, employee.Name as BarberName FROM appointments INNER JOIN employee ON employee.EmployeeID = appointments.EmployeeID INNER JOIN customer ON appointments.CustomerID = customer.CustomerID WHERE Date>current_date()";
  const values = [CustomerID];
  await db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error while retrieving appointments");
    }
    console.log("Succecsfully retrieved appointments");
    return res.status(200).json(result);
  });
};

const makeAppointment = async (req, res) => {
  const token = req.headers["access-token"];
  const verify = await userVerification(token);
  console.log(verify);
  if (!verify.bool) {
    return res.send("NotAuthenticated");
  } else {
    const reqDate = new Date(req.body.date);
    const [hours, minutes, seconds] = req.body.time.split(":");
    reqDate.setHours(hours);
    reqDate.setMinutes(minutes);
    reqDate.setSeconds = seconds;
    const currentDate = new Date();
    console.log(reqDate);
    const query_DateRestriction =
      "SELECT max(date) as latestDate, max(time) as time FROM appointments WHERE customerid=?";
    const DateRestrictionValues = req.body.customerID;
    db.query(query_DateRestriction, DateRestrictionValues, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Cant query dates from appointments!");
      } else if (data.latestDate) {
        const [hours, minutes, seconds] = data[0].time.split(":");

        const AppointmentDate = new Date(data[0].latestDate);
        AppointmentDate.setHours(hours);
        AppointmentDate.setMinutes(minutes);
        AppointmentDate.setSeconds(seconds);

        console.log(currentDate + " | " + AppointmentDate);

        if (reqDate < currentDate) return res.status(406).send("RejectedDate");
        else if (AppointmentDate >= currentDate)
          return res.status(406).send("AlreadyActive");
        else {
          insertAppointment(req, res);
        }
      } else {
        insertAppointment(req, res);
      }
    });
  }
};

module.exports = {
  getAppointments,
  makeAppointment,
};
