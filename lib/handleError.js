function handleError(req, res, errCode) {
	switch (errCode) {
		case 404:
			res.render("error404");
			break;
		case 403:
			res.render("error403");
			break;
		case 500:
			res.render("error500");
			break;
		case 503:
			res.render("error503");
			break;
		case 504:
			res.render("error404");
			break;
		default:
			res.render("error500");
			break;
	}
}

module.exports = handleError;
