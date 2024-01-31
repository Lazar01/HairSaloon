const express = require('express');
const app = express();


const cors = require('cors');


const appRoute = require('./routes/route.js')

app.use(express.json());
app.use(cors());
app.use(appRoute);






const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port: " + port)
})