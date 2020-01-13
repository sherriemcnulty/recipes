// Controller:
// - Verify route
// - If not valid -> render 404 page and return error code to the client
// - Else -> Send the request to the model and return the result to the client

const express = require("express");
const model = require("../models/model.js");
let router = express.Router();

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

// Send all recipes to the client as JSON
router.get("/api/json", function(req, res) {
	model.all(function(data) {
		let hbsObject = {
			recipes: data
		};
		res.json(hbsObject);
	});
});

// Render populated view-one.handlebars
router.get("/api/:id", function(req, res) {
	let condition = "id = " + req.params.id;

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

// POST a new recipe & return result as JSON
router.post("/api/recipes", function(req, res) {
	model.create(
		["category, dish, prep_time, ingredients, directions, recipe_yield"],
		[
			req.body.category,
			req.body.dish,
			req.body.prep_time,
			req.body.ingredients,
			req.body.directions,
			req.body.recipe_yield
		],
		function(result) {
			// Send back the ID of the new recipe
			res.json({
				id: result.insertId
			});
		}
	);
});

// DELETE a recipe
router.delete("/api/recipes/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	model.delete(condition, function(result) {
		if (result.affectedRows == 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

// Page not found
router.get("*", function(req, res) {
	res.render(page - not - found);
});

// Export routes for server.js to use.
module.exports = router;
