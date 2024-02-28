const db_connection = require("../db_connection.js");
const db = db_connection.connectWithDatabase();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const getAllEmployees = (req, res) => {
  const query = "SELECT * FROM employee";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Error getting all the employees");
    } else {
      console.log("Emloyees retrieved successfully");
      return res.status(200).json(result);
    }
  });
};
const createNewEmployee = (req, res) => {
  const query = "INSERT INTO employee (Name, Address, Image) VALUES (?, ?, ?)";
  const imageFileName = req.file ? req.file.filename : null;
  const values = [req.body.title, req.body.description, imageFileName];

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
  const query =
    "UPDATE employee SET Name = ?, Address = ?, Image = ? WHERE EmployeeID=?";
  const imageFileName = req.file ? req.file.filename : null;
  const values = [
    req.body.title,
    req.body.description,
    imageFileName,
    req.body.id,
  ];
  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error updating employee: ", error);
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
      console.log("Error deleting employee:", err);
      return res.status(500).send("Error deleting employee");
    } else {
      console.log("Successfully deleted blog");
      return res.status(200).send("success");
    }
  });
};

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

const getAllBlogs = (req, res) => {
  const query = "SELECT * FROM blogs";
  db.query(query, (err, result) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(result);
    }
  });
};
const makeBlog = (req, res) => {
  const query =
    "INSERT INTO blogs (Title, Description, Image, Date) VALUES (?, ?, ?, ?)";
  const imageFileName = req.file ? req.file.filename : null;
  const values = [
    req.body.title,
    req.body.description,
    imageFileName,
    req.body.date,
  ];

  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting blog");
    } else {
      console.log("Blog inserted successfully");
      return res.status(200).send("success");
    }
  });
};
const editBlog = (req, res) => {
  const query =
    "UPDATE blogs SET Title = ?, Description = ?, Image = ? WHERE BlogID=?";
  const imageFileName = req.file ? req.file.filename : null;
  console.log(req.file);
  const values = [
    req.body.title,
    req.body.description,
    imageFileName,
    req.body.id,
  ];
  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting blog");
    } else {
      console.log("Blog updated successfully");
      return res.status(200).send("success");
    }
  });
};
const deleteBlog = (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM blogs WHERE BlogID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error deleting blog:", err);
      return res.status(500).send("Error deleting blog");
    } else {
      console.log("Successfully deleted blog");
      return res.status(200).send("success");
    }
  });
};

const signup = (req, res) => {
  const { name, email, contactNumber, password } = req.body;
  console.log(typeof password);
  // if(name === "")
  //     return res.status(400).send("The name isn't provided!");
  // else if(email === "");
  //     return res.status(400).send("The email isn't provided");

  db.query(
    "SELECT EmailAddress FROM customer WHERE EmailAddress = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }

      console.log(result);

      if (result.length > 0) {
        return res.send("AlreadyRegisteredEmail");
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const queryInsert =
        "INSERT INTO customer(Name, EmailAddress, ContactNumber, Password) VALUES(?,?,?,?)";
      const values = [name, email, contactNumber, hashedPassword];

      db.query(queryInsert, values, (error, result) => {
        if (error) {
          console.log("Greska je: " + error);
          return res.status(500).send(error);
        } else {
          return res.send("successful");
        }
      });
    }
  );
};

const login = (req, res) => {
  const sql = "SELECT * FROM customer WHERE EmailAddress = ?";
  db.query(sql, [req.body.email], (error, result) => {
    if (error) {
      return res.status(500).send("Error");
    }
    if (result.length > 0) {
      console.log(typeof req.body.password);
      bcrypt.compare(req.body.password, result[0].Password, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        if (!data) {
          return res.status(401).send("Invalid password");
        }
        const id = result[0];
        console.log("Ovo je id: ", id);
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 3600,
        });
        return res.json({ Login: true, token });
      });
    } else {
      return res.status(401).send("Fail");
    }
  });
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    console.log("ovde1");
    return res.send("No token!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("ovde2");
        return res.send("Not Authenticated");
      } else {
        console.log("ovde3");
        return res.json({
          Message: "Authenticated",
          user: decoded.id,
          ExpTime: decoded.exp,
        });
      }
    });
  }
};

const sendEmail = async (req, res) => {
  const SUBJECT = req.body.subject;
  const MESSAGE = req.body.message;
  const userEmail = req.body.email;

  let config = {
    service: "gmail",
    auth: {
      user: "lekla237@gmail.com",
      pass: "yaknsixupgfdudtr",
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "HairBarber",
      intro: "Somebody contacted you!",
      table: {
        data: [
          {
            item: "New Message",
            description: MESSAGE,
            userMail: userEmail,
          },
        ],
      },
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "lekla237@gmail.cok",
    to: "lekoviclazar0@gmail.com",
    subject: SUBJECT,
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

const generateToken = (module.exports = {
  getAppointments,
  makeAppointment,
  getAllEmployees,
  createNewEmployee,
  editEmployee,
  deleteEmployee,
  getAllServices,
  sendEmail,
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
});
