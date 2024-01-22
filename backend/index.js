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
        const query = `SELECT * FROM appointments WHERE EmployeeID = ? AND Date = ?`;
        const values = [req.body.EmployeeID, req.body.Date];
        const appointmentsData = await db.query(query,values,(req,result)=>{
            const responseData = result;
            res.status(200).send(responseData);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/makeAppointment', (req,res) => {
    const query = 'INSERT INTO appointments (Time, Date, EmployeeID, CustomerID) VALUES (?, ?, ?, ?)';
    const values = [req.body.time, req.body.date, req.body.employeeID, req.body.customerID];

    db.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting appointment');
        } else {
          console.log('Appointment inserted successfully');
          res.status(200).send('Appointment inserted successfully');
        }
    })
})

app.get('/getAllEmployees', (req,res)=>{
    const query = "SELECT * FROM employee";

    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Error getting all the employees');
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