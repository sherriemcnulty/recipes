// Set up dependenencies
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

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
const exphbs = require("express-handlebars");
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/controller.js");
app.use(routes);

// Start the server
app.listen(port, function() {
	console.log("App now listening at localhost: " + port);
});
