import log from './logger';
import config from 'config';
import { connection } from 'mongoose';

const conn = require('./connect.ts');
const app = require('./app.ts');

// gets items from default config file
const port = config.get('port') as number;
const host = config.get('host') as string;
// this is used to get info on the connection to the DB.
const db = connection;

// connect to the mongoDB database
conn.connectDB().then(() => {
	app.listen(port, host, () => {
		log.info(`Server is running at http://${host}:${port}/`);

		db.on('error', (err) => {
			log.error(err);
			// exit the process with a failure
			process.exit(1);
		});
	});
});
