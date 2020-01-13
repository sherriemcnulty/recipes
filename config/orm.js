// orm.js:
// Recieves request objects from model.js functions
// Converts them into SQL query strings
// Sends the query to the database
// Sends the results back to the calling function

const connection = require("../config/connection.js");

// Helper function that creates an array of question marks and converts them to a string
function printQuestionMarks(num) {
	let arr = [];

	for (let i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

// Helper function that converts key/value pairs to SQL syntax
function objToSql(ob) {
	let arr = [];

	// loop through the keys and push the key/value as a string int arr
	for (let key in ob) {
		let value = ob[key];

		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// Escape single quotes within strings
			value = value.replace("'", "\\'");

			// Put quotes around the string, ie.(Lana Del Grey => 'Lana Del Grey')
			value = "'" + value + "'";

			// push key/value onto the array
			arr.push(key + "=" + value);
		}
	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
}

// The "orm" hConvert user request into database queries, pass them to the database. Use the "cb" parameter to return the result to the calling function.
let orm = {
	// Get all recipes
	all: function(tableInput, cb) {
		let queryString = `SELECT * FROM ${tableInput};`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Get a single recipe
	getWhere: function(tableInput, condition, cb) {
		let queryString = `SELECT * FROM ${tableInput} WHERE ${condition};`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Insert a recipe into the database
	create: function(table, cols, vals, cb) {
		let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(
			vals.length
		)})  `;

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Update a recipe
	update: function(table, objColVals, condition, cb) {
		let queryString = `UPDATE ${table} SET ${objToSql(
			objColVals
		)} WHERE ${condition} `;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// Delete a recipe
	delete: function(table, condition, cb) {
		let queryString = `DELETE FROM ${table} WHERE ${condition}`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	}
}; // orm

// Export the orm object for the model.
module.exports = orm;
