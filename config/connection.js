// Dependencies
require("dotenv").config();
const MYSQL = require("mysql");

// Connect to Heroku if available, else connect to the local database.
let connection;
if (process.env.JAWSDB_URL) {
	connection = MYSQL.createConnection(process.env.JAWSDB_URL);
} else {
	connection = MYSQL.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: process.env.MYSQL_PASSWORD,
		database: "recipes_db"
	});
}

connection.connect(function(err) {
	if (err) {
		console.error("Error connecting: " + err.stack);
		return;
	}
	console.log("Connected as id " + connection.threadID);
});

// Export connection for ORM to use
module.exports = connection;
