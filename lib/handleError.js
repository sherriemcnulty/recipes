function handleError(req, res, errCode) {
	switch (errCode) {
		case 404:
			res.render("error404");
			break;
	}
}

module.exports = handleError;
