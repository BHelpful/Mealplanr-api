import express from 'express';
import config from 'config';
import log from './logger';
import connect from './connect';

// Gets items from default config file
const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.listen(port, host, () => {
	log.info(`Server is running at http://${host}:${port}/`);
	connect();
});
