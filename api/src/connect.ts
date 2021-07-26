import { connect as mConnect } from 'mongoose';
import config from 'config';
import log from './logger';

/**
 * This function connects to the mongoDB database on the server
 * using the dbURI from the config file.
 *
 * @remarks
 * It logs on success and on connection error.
 */
function connect() {
	const dbUri = config.get('dbUri') as string;

	return mConnect(dbUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(() => {
			log.info('Connection success');
		})
		.catch((error) => {
			log.error('Error in connecting', error);
		});
}

export default connect;
