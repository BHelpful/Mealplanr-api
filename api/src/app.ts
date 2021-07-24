import express from 'express';
import config from 'config';
import log from './logger';
import connect from './connect';
import routes from './routes';
import mongoose from 'mongoose';
import { deserializeUser } from './middleware';

// gets items from default config file
const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

// this will attach the user to every single request
// that comes into the application
app.use(deserializeUser);

// need to use this in order to understand the JSON body from RESTful requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is used to get info on the connection to the DB.
const db = mongoose.connection;

app.listen(port, host, () => {
	log.info(`Server is running at http://${host}:${port}/`);
	// connect to the mongoDB database
	connect();
	db.on('error', (err) => {
		log.error(err);
		// exit the process with a failure
		process.exit(1);
	});

	// pass express app to routes
	routes(app);
});
