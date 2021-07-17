import logger from 'pino';
import dayjs from 'dayjs';

// This logger is created becase it can be formatted like this, and because console.log logs the IO,
// and because node.js is a single threaded environment, it is important to have a logger that is not logging to the console.
const log = logger({
	prettyPrint: true,
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
