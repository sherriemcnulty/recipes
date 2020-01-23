const connection = require("../config/connection.js");

// printQuestionMarks(): Helper function that creates an array of question marks and converts them to a string
function printQuestionMarks(num) {
	let arr = [];

	for (let i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

// objToSql(): Helper function that converts input key/value pairs (obj) into MySQL query string
function objToSql(obj) {
	let arr = [];

	for (let key in obj) {
		let value = obj[key];

		// if obj[key] has a value assigned to it -> put single quotes around the values
		// (you must escape all single quotes within each value before enclosing it with surrounding quotes)
		if (Object.hasOwnProperty.call(obj, key)) {
			value = value.replace("'", "\\'");
			value = "'" + value + "'";
			arr.push(key + "=" + value);
		}
	}
	return arr.toString();
}

// Orm (Object Relational Mapping) functions:
// (1) map input request object to a MySQL query string
// (2) send query string to the database via connection (connection.js)
// (3) return result
let Orm = {
	// get all recipes
	all: function(tableInput, cb) {
		let queryString = `SELECT * FROM ${tableInput};`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// get one recipe
	getWhere: function(tableInput, condition, cb) {
		let queryString = `SELECT * FROM ${tableInput} WHERE ${condition};`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	// insert a recipe
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

	// update a recipe
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

	// delete a recipe
	delete: function(table, condition, cb) {
		let queryString = `DELETE FROM ${table} WHERE ${condition}`;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	}
};

module.exports = Orm;
