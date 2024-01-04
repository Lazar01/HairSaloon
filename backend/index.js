const db_connection = require('./db_connection.js');

const express = require('express');
const app = express();

db_connection.connectWithDatabase();

app.get('/getAppointments', (req,res)=>{
    res.send('');
    db.query("SELECT * FROM hairsaloon.appointments",(err,data)=>{
        if(err)
            res.json(err);
        res.json(data)
    })
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})