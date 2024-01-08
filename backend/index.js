const db_connection = require('./db_connection.js');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const db = db_connection.connectWithDatabase();

app.get('/getAppointments', (req,res)=>{
    db.query("SELECT * FROM hairsaloon.appointments",(err,data)=>{
        if(err)
            res.json(err);
        console.log(data);
        res.send(data);
    })
})
app.post('/makeAppointment', (req,res) => {
    const query = 'INSERT INTO appointments (Time, Date, EmployeeID, CustomerID) VALUES (?, ?, ?, ?)';
    const values = [req.query.time, req.query.date, req.query.employeeID, req.query.customerID];

    db.query(query, values, (error, results) => {
        if (error) {
          // Handle the error appropriately
          console.error(error);
          res.status(500).send('Error inserting appointment');
        } else {
          // Handle the success case
          console.log('Appointment inserted successfully');
          res.status(200).send('Appointment inserted successfully');
        }
    })
})

app.get('/getAllEmployees', (req,res)=>{
    const query = "SELECT * FROM employees";

    db.query(query,(err,result)=>{
        if(error){
            console.log(err);
            res.status(500).send('Error getting all the employees');
        }
        else{
            console.log('Emloyees retrieved successfully');
            res.status(200).send('Emloyees retrieved successfully');
        }
    })
})



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})