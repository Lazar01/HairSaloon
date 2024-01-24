const db_connection = require('./db_connection.js');

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const util = require('util');
const promisify = util.promisify;


const db = db_connection.connectWithDatabase();

app.get('/getAppointments', async (req, res) => {
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
});

app.post('/makeAppointment', (req,res) => {
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
})

app.get('/getAllEmployees', (req,res)=>{
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
})



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})