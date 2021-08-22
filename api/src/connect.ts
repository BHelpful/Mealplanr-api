import { connect, disconnect } from 'mongoose';
import log from './logger';

const dbUri = process.env.DB_URI as string;

/**
 * This function connects to the mongoDB database on the server
 * using the dbURI from the config file.
 *
 * @remarks
 * It logs on success and on connection error.
 */
function connectDB() {
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === 'test') {
			// In test environment, we don't want to connect to the real DB.
			const mongoose = require('mongoose');
			const Mockgoose = require('mockgoose').Mockgoose;
			const mockgoose = new Mockgoose(mongoose);

			mockgoose.prepareStorage().then(() => {
				connect(dbUri, {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true,
				})
					.then((res) => {
						log.info('Connection success');
						resolve(res);
					})
					.catch((error) => {
						log.error('Error in connecting', error);
						return reject(error);
					});
			});
		} else {
			// If not in test environment, connect to the database
			connect(dbUri, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
				.then((res) => {
					log.info('Connection success');
					resolve(res);
				})
				.catch((error) => {
					log.error('Error in connecting', error);
					return reject(error);
				});
		}
	});
}

function closeDB() {
	return disconnect();
}

module.exports = { connectDB, closeDB };
