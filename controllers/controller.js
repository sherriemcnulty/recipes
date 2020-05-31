const express = require("express");
const model = require("../models/model");
const app = express.Router();

// Render the index page
app.get("/", function (req, res) {
	res.render("index");
});

// Render a blank page to add a new recipe
app.get("/api/create", function (req, res) {
	res.render("create");
});

// Render a page that that shows all recipes in the database
app.get("/api", function (req, res) {
	model.all(function (data) {
		let hbsObject = {
			recipes: data,
		};
		res.render("view-all", hbsObject);
	});
});

// Render a page that shows the recipe with the specified id
app.get("/api/:id", function (req, res) {
	let condition = "id = " + req.params.id;
	let id = req.params.id;

	model.getWhere(condition, function (data) {
		let hbsObject = {
			recipes: data,
		};
		res.render("view-one", hbsObject);
	});
});

// Render a form that is populated with a recipe with the specified id
app.get("/api/recipes/:id", function (req, res) {
	let condition = "id = " + req.params.id;

	model.getWhere(condition, function (data) {
		let hbsObject = {
			recipes: data[0],
		};
		res.render("update", hbsObject);
	});
});

// Insert a new recipe & return the id
app.post("/api/recipes", function (req, res) {
	model.create(
		["title, prep_time, ingredients, directions, servings"],
		[
			req.body.title,
			req.body.prep_time,
			req.body.ingredients,
			req.body.directions,
			req.body.servings,
		],
		function (result) {
			res.json({
				id: result.insertId,
			});
		}
	);
});

// Update a recipe
app.put("/api/recipes/:id", function (req, res) {
	let condition = "id = " + req.params.id;

	model.update(req.body, condition, function (result) {
		if (result.changedRows == 0) {
			// If no rows changed -> id must not exist
			res.render("error400");
		} else {
			res.status(200).end();
		}
	});
});

// Send all recipes to the client as JSON
app.get("/api/json", function (req, res) {
	model.all(function (data) {
		let hbsObject = {
			recipes: data,
		};
		res.json(hbsObject);
	});
});

// Delete a recipe
app.delete("/api/recipes/:id", function (req, res) {
	let condition = "id = " + req.params.id;

	model.delete(condition, function (result) {
		if (result.affectedRows == 0) {
			// If no rows changed -> id must not exist
			return res.status(400).end();
		} else {
			res.status(200).end();
		}
	});
});

// Render a custom 404 page
app.get("*", function (req, res) {
	res.render("page404");
});

module.exports = app;
