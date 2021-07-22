import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

/**
 * This function 
 *
 * @remarks
 * 
 *
 * @param x - 
 * @param y - 
 * @returns 
 */
function connect() {
	const dbUri = config.get('dbUri') as string;

	return mongoose
		.connect(dbUri, {
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
