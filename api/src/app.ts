import express from 'express';
import config from 'config';
import log from './logger';
import connect from './connect';
import routes from './routes';
import mongoose from 'mongoose';


// Gets items from default config file
const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

// need to use this in order to understand the JSON body from RESTful requests
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;

app.listen(port, host, () => {
	log.info(`Server is running at http://${host}:${port}/`);
	// Connect to the mongoDB database
	connect();
	db.on('error', (err) => {
		log.error(err);
		// Exit the process with a failure
		process.exit(1);
	});
	db.on('open', () => {
		log.info('Connected to database');
	});

	// Pass express app to routes
	routes(app);
});
