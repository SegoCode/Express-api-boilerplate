const morgan = require('morgan'); // https://expressjs.com/en/resources/middleware/morgan.html
const fs = require('fs');
const path = require('path');

morgan.token('body', (req, res) => JSON.stringify(req.body));
const logFormat = '[:date[iso]] :remote-addr - :method :url :status - :response-time ms - :body';

/*
//NOTE: If you can't run pm2 for some reason and you also need file logs, uncomment and export this middleware

const file = {
	logDir: 'logs/morgan',
	logFileName: 'api.log',
	greaterThan: () => {
		return typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.trim() === 'production' ? 499 : 0;
	},
};

//File logger config
function fileLogger() {
	fs.existsSync(file.logDir) || fs.mkdirSync(file.logDir);
	//NOTE: flags: 'a' for append, for log rotation check rotating-file-stream for morgan
	let accessLogStream = fs.createWriteStream(path.join(file.logDir, file.logFileName), { flags: 'a' });
	return morgan(logFormat, { stream: accessLogStream, skip: (req, res) => res.statusCode < file.greaterThan });
}
*/

//Console logger config
function consoleLogger() {
	return morgan(logFormat);
}

module.exports = { consoleLogger };
