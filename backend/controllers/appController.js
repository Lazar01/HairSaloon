
const db_connection = require('../db_connection.js');
const db = db_connection.connectWithDatabase();
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');



const getAppointments = async (req,res) => {
    try {
        const {EmployeeID, Date} = req.query;
        const query = `SELECT * FROM appointments WHERE EmployeeID = ? AND Date = ?`;
        const values = [EmployeeID, Date];
        const appointmentsData = await db.query(query,values,(err,result)=>{
            
            const time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
            const reservedTimes = result.map((appointment) => appointment.Time.split(':').slice(0, 2).join(':'));
            const responseData = time.filter( item => !reservedTimes.includes(item));
            res.status(200).json(responseData);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const makeAppointment = (req,res) => {
    const query = 'INSERT INTO appointments (Time, Date, EmployeeID, CustomerID) VALUES (?, ?, ?, ?)';
    const values = [req.body.time, req.body.date, req.body.employeeID, req.body.customerID];
    if(req.body.time == "")
    {
        res.status(200).json("time");
        return;
    }
    if(req.body.EmployeeID == "")
    {
        res.status(200).json("employee");
        return;
    }
    if(req.body.date == "")
    {
        res.status(200).json("date");
        return;
    }

    db.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json('Error inserting appointment');
        } else {
          console.log('Appointment inserted successfully');
          res.status(200).json('success');
        }
    })
}

const getAllEmployees = (req,res) => {
    const query = "SELECT * FROM employee";

    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json('Error getting all the employees');
        }
        else{
            console.log('Emloyees retrieved successfully');
            res.status(200).json(result);
        }
    })
}

const getAllServices = (req,res) => {
    const query = "SELECT * FROM services";
    console.log("Usao")
    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error getting all the services');
        }
        else{
            console.log('Services retrieved successfully');
            res.status(200).json(result);
        }
    })
}

const sendEmail = async (req,res) => {
    console.log("Pristupio");
    const SUBJECT = req.body.subject;
    const MESSAGE = req.body.message;
    const userEmail = req.body.email;   

    let config = {
        service : 'gmail',
        auth : {
            user: "lekla237@gmail.com",
            pass: "yaknsixupgfdudtr"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "HairBarber",
            intro: "Somebody contacted you!",
            table : {
                data : [
                    {
                        item : "New Message",
                        description: MESSAGE,
                        userMail: userEmail
                    },
                ]
            },
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : "lekla237@gmail.cok",
        to : "lekoviclazar0@gmail.com",
        subject: SUBJECT,
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        console.log(error);
        return res.status(500).json({ error })
    })
}

module.exports = {
    getAppointments,
    makeAppointment,
    getAllEmployees,
    getAllServices,
    sendEmail
}