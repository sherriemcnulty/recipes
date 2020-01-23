const express = require("express");
const model = require("../models/model");
require("../lib/handleError");

const router = express.Router();

// Render index.handlebars
router.get("/", function(req, res) {
	res.render("index");
});

// Render create.handlebars
router.get("/api/create", function(req, res) {
	res.render("create");
});

// Render populated view-all.handlebars
router.get("/api", function(req, res) {
	model.all(function(data) {
		let hbsObject = {
			recipes: data
		};
		res.render("view-all", hbsObject);
	});
});

// Render populated view-one.handlebars
router.get("/api/:id", function(req, res) {
	let condition = "id = " + req.params.id;
	let id = req.params.id;

	model.getWhere(condition, function(data) {
		let hbsObject = {
			recipes: data
		};
		res.render("view-one", hbsObject);
	});
});

// Render populated update.handlebars
router.get("/api/recipes/:id", function(req, res) {
	let condition = "id = " + req.params.id;

	model.getWhere(condition, function(data) {
		let hbsObject = {
			recipes: data[0]
		};
		res.render("update", hbsObject);
	});
});

// Insert a new recipe & return the id
router.post("/api/recipes", function(req, res) {
	model.create(
		["title, prep_time, ingredients, directions, servings"],
		[
			req.body.title,
			req.body.prep_time,
			req.body.ingredients,
			req.body.directions,
			req.body.servings
		],
		function(result) {
			// Send back the ID of the new recipe
			res.json({
				id: result.insertId
			});
		}
	);
});

// Delete a recipe
router.delete("/api/recipes/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	model.delete(condition, function(result) {
		if (result.affectedRows == 0) {
			// If no rows changed -> id must not exist
			return res.status(400).end();
		} else {
			res.status(200).end();
		}
	});
});

// Update a recipe
router.put("/api/recipes/:id", function(req, res) {
	let condition = "id = " + req.params.id;

	model.update(req.body, condition, function(result) {
		if (result.changedRows == 0) {
			// If no rows changed -> id must not exist
			// return res.status(400).end();
			res.render("");
		} else {
			res.status(200).end();
		}
	});
});

// Send all recipes to the client as JSON
router.get("/api/json", function(req, res) {
	model.all(function(data) {
		let hbsObject = {
			recipes: data
		};
		res.json(hbsObject);
	});
});

// Page not found
router.get("*", function(req, res) {
	handleError(req, res, 404);
});

module.exports = router;
