function clean(data = '') {
	let isObject = false;
	if (typeof data === 'object') {
		data = JSON.stringify(data);
		isObject = true;
	}

	data = inHTMLData(data).trim();
	if (isObject) data = JSON.parse(data);

	return data;
}

function xssfilter() {
	return (req, res, next) => {
		if (req.body) req.body = clean(req.body);
		if (req.query) req.query = clean(req.query);
		if (req.params) req.params = clean(req.params);
		next();
	};
}

//TODO: create more security filter