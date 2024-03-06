const { db } = require("./appController.js");
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
  try {
    const { EmployeeID, Date } = req.query;
    const query = `SELECT * FROM appointments WHERE EmployeeID = ? AND Date = ?`;
    const values = [EmployeeID, Date];
    const appointmentsData = await db.query(query, values, (err, result) => {
      const time = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
      ];
      const reservedTimes = result.map((appointment) =>
        appointment.Time.split(":").slice(0, 2).join(":")
      );
      const responseData = time.filter((item) => !reservedTimes.includes(item));
      return res.status(200).json(responseData);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const makeAppointment = (req, res) => {
  const reqDate = new Date(req.body.date);
  const [hours, minutes, seconds] = req.body.time.split(":");
  reqDate.setHours(hours);
  reqDate.setMinutes(minutes);
  reqDate.setSeconds = seconds;
  const currentDate = new Date();
  console.log(reqDate);
  const query_DateRestriction =
    "SELECT max(date) as latestDate, max(time) as time FROM appointments WHERE customerid=16";
  const DateRestrictionValues = req.body.customerID;
  db.query(query_DateRestriction, DateRestrictionValues, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Cant query dates from appointments!");
    } else if (data.length > 0) {
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
};

module.exports = {
  getAppointments,
  makeAppointment,
};
