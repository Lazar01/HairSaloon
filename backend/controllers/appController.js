
const db_connection = require('../db_connection.js');
const db = db_connection.connectWithDatabase();
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const getAppointments = async (req,res) => {
    try {
        const {EmployeeID, Date} = req.query;
        const query = `SELECT * FROM appointments WHERE EmployeeID = ? AND Date = ?`;
        const values = [EmployeeID, Date];
        const appointmentsData = await db.query(query,values,(err,result)=>{
            
            const time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
            const reservedTimes = result.map((appointment) => appointment.Time.split(':').slice(0, 2).join(':'));
            const responseData = time.filter( item => !reservedTimes.includes(item));
            return res.status(200).json(responseData);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

const makeAppointment = (req,res) => {
    const query = 'INSERT INTO appointments (Time, Date, EmployeeID, CustomerID) VALUES (?, ?, ?, ?)';
    const values = [req.body.time, req.body.date, req.body.employeeID, req.body.customerID];
    if(req.body.time == "")
    {
        return res.status(200).send("time");
    }
    if(req.body.EmployeeID == "")
    {
        return res.status(200).send("employee");
    }
    if(req.body.date == "")
    {
        return res.status(200).send("date");
    }

    db.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json('Error inserting appointment');
        } else {
          console.log('Appointment inserted successfully');
          return res.status(200).json('success');
        }
    })
}

const getAllEmployees = (req,res) => {
    const query = "SELECT * FROM employee";

    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json('Error getting all the employees');
        }
        else{
            console.log('Emloyees retrieved successfully');
            return res.status(200).json(result);
        }
    })
}

const getAllServices = (req,res) => {
    const query = "SELECT * FROM services";
    console.log("Usao")
    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Error getting all the services');
        }
        else{
            console.log('Services retrieved successfully');
            return res.status(200).json(result);
        }
    })
}

const signup = (req,res) => {
    const {name, email, contactNumber, password} = req.body;
    console.log(typeof(password));
    // if(name === "")
    //     return res.status(400).send("The name isn't provided!");
    // else if(email === "");
    //     return res.status(400).send("The email isn't provided");

    

    db.query('SELECT EmailAddress FROM customer WHERE EmailAddress = ?', [email], async (error, result) => {
        
        if(error)
        {
            console.log(error);
        }
        
        console.log(result);

        if(result.length > 0 ){
            return res.send("AlreadyRegisteredEmail")
        }
  
    
        const hashedPassword = await bcrypt.hash(password, 8);
        
        const queryInsert = "INSERT INTO customer(Name, EmailAddress, ContactNumber, Password) VALUES(?,?,?,?)";
        const values = [name, email, contactNumber, hashedPassword];

        db.query(queryInsert, values, (error, result)=>{
            if(error)
            {
                console.log("Greska je: " + error);
                return res.status(500).send(error);
            }
            else
            {
                return res.send("successful");
            }
        })
    })
}

const login = (req, res) => {
    const sql = "SELECT * FROM customer WHERE EmailAddress = ?";
    db.query(sql, [req.body.email], (error, result) => {
        if (error) {
            return res.status(500).send("Error");
        }
        if (result.length > 0) {
            console.log(typeof(req.body.password))
            bcrypt.compare(req.body.password, result[0].Password, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                if (!data) {
                    return res.status(401).send('Invalid password');
                }
                const id = result[0];
                console.log("Ovo je id: ", id);
                const token = jwt.sign( {id} , process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
                return res.json({ Login: true, token });
            });
        } else {
            return res.status(401).send("Fail");
        }
    });
};


const verifyJWT = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token){
        console.log("ovde1");
        return res.send("No token!");
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err)
            {
                console.log("ovde2");
                return res.send("Not Authenticated");
            }
            else
            {
                console.log("ovde3");
                return res.json({Message:'Authenticated', user: decoded.id});
            }
        })
    }
}

const sendEmail = async (req,res) => {
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

const generateToken = 

module.exports = {
    getAppointments,
    makeAppointment,
    getAllEmployees,
    getAllServices,
    sendEmail,
    signup,
    login,
    verifyJWT
}