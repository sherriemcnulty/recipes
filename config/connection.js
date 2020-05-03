require("dotenv").config();
const MYSQL = require("mysql");
let Connection;

// connect to the database
if (process.env.JAWSDB_URL) {
	Connection = MYSQL.createConnection(process.env.JAWSDB_URL);
} else {
	Connection = MYSQL.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: process.env.MYSQL_PASSWORD,
		database: "recipes_db",
	});
}

Connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected to the database!");
});

module.exports = Connection;
