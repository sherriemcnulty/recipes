// Model:
// Recieves request from the controller
// Verifies the request
// IF not valid -> return an error
// ELSE -> send request to the ORM and return result

// Import the ORM to call functions that will interact with the database.
var orm = require("../config/orm.js");

var model = {
	all: function(cb) {
		orm.all("recipes", function(res) {
			cb(res);
		});
	},
	getWhere: function(condition, cb) {
		orm.getWhere("recipes", condition, function(res) {
			cb(res);
		});
	},
	// The variables cols and vals are arrays.
	create: function(cols, vals, cb) {
		orm.create("recipes", cols, vals, function(res) {
			cb(res);
		});
	},
	update: function(objColVals, condition, cb) {
		orm.update("recipes", objColVals, condition, function(res) {
			cb(res);
		});
	},
	delete: function(condition, cb) {
		orm.delete("recipes", condition, function(res) {
			cb(res);
		});
	}
};

// Export the database functions for the controller (recipesController.js).
module.exports = model;
