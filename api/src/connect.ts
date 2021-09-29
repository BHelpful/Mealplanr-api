import { connect, disconnect } from 'mongoose';
import log from './logger';
const mongoose = require('mongoose');
import { Mockgoose } from 'mockgoose';
const mockgoose = new Mockgoose(mongoose);

const dbUri = process.env.DB_URI as string;

/**
 * This function connects to the mongoDB database on the server
 * using the dbURI from the config file.
 *
 * @remarks
 * It logs on success and on connection error.
 */
export async function connectDB() {
	if ((process.env.NODE_ENV as string) === 'test') {
		// In test environment, we don't want to connect to the real DB.
		await mockgoose.prepareStorage();
		await connect(dbUri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}).catch((error) => {
			log.error('Error in connecting', error);
		});
		log.info('Connection success');
	} else {
		// If not in test environment, connect to the database
		await connect(dbUri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}).catch((error) => {
			log.error('Error in connecting', error);
		});
		log.info('Connection success');
	}
}

export async function closeDB() {
	await mockgoose.shutdown();
	await disconnect();
}
