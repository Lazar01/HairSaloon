const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
function connectWithDatabase() {
  var mysql = require("mysql");

  var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    timezone: "+00:00",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
}

module.exports = { connectWithDatabase };
