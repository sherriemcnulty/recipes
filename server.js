// Set up dependenencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static content from the public directory
// Parse request body as JSON
app.use(express.static("public"));
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());

// Setup handlebars
const EXPHBS = require("express-handlebars");
app.engine(
	"handlebars",
	EXPHBS({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const ROUTES = require("./controllers/controller.js");
app.use(ROUTES);

// Start the server
app.listen(PORT, function() {
	console.log("App now listening at localhost: " + PORT);
});
