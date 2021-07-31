import { connect } from 'mongoose';
var tunnel = require('tunnel-ssh');
import config from 'config';
import log from './logger';

/**
 * This function connects to the mongoDB database on the server
 * using the dbURI from the config file.
 *
 * @remarks
 * It logs on success and on connection error.
 */
function connectDB() {
	const dbUri = config.get('dbUri') as string;
	const tunnelConfig = config.get('tunnelConfig') as string;
	return tunnel(tunnelConfig, function (error: any, server: any) {
		if (error) {
			console.log('SSH connection error: ' + error);
		}
		return connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
			.then(() => {
				log.info('Connection success');
			})
			.catch((error) => {
				log.error('Error in connecting', error);
			});
	});
}

export default connectDB;
