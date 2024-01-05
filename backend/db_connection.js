function connectWithDatabase()
{
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"HairSaloon"
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });

      return con;
}

module.exports = {connectWithDatabase};