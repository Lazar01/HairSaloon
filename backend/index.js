const express = require('express');
const app = express();
const cors = require('cors');
const appRoute = require('./routes/route.js');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(appRoute);

app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})