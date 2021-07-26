import express from 'express';
import { connection } from 'mongoose';
import { serve, setup } from 'swagger-ui-express';
import config from 'config';
import log from './logger';
import connect from './connect';
import { deserializeUser } from './middleware';
import usersRouter, { usersPost } from './routes/users';
import sessionsRouter, {
	sessionsPost,
	sessionsGet,
	sessionsDelete,
} from './routes/sessions';
import * as swaggerDocument from './swagger.json';
import { categorySM } from './collections/category/category.model';
import { ingredientSM } from './collections/ingredient/ingredient.model';
import { recipeSM } from './collections/recipe/recipe.model';
import { sessionSM } from './collections/session/session.model';
import { storeSM } from './collections/store/store.model';
import { userSM } from './collections/user/user.model';
var compression = require('compression');

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

// use this to compress the responses (gzip Compression)
app.use(compression());

// assigning app-wide cache settings
app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));

// defining the parsed swagger file in order to be able to add to it
var parsedSwaggerDoc = JSON.parse(JSON.stringify(swaggerDocument));

// Adding mongoose models to swagger docs
parsedSwaggerDoc.definitions.Ingredient = ingredientSM;
parsedSwaggerDoc.definitions.Category = categorySM;
parsedSwaggerDoc.definitions.Session = sessionSM;
parsedSwaggerDoc.definitions.Store = storeSM;
parsedSwaggerDoc.definitions.Recipe = recipeSM;
parsedSwaggerDoc.definitions.User = userSM;

// This is where the basic routes are defined
// (for each route the different methods will be added to the swagger file)
app.use('/users', usersRouter);
parsedSwaggerDoc.paths['/users'] = usersPost;

app.use('/sessions', sessionsRouter);
parsedSwaggerDoc.paths['/sessions'] = {
	...sessionsPost,
	...sessionsGet,
	...sessionsDelete,
};

// set up the Swagger UI
app.use('/api-docs', serve, setup(parsedSwaggerDoc));

// this is used to get info on the connection to the DB.
const db = connection;

app.listen(port, host, () => {
	log.info(`Server is running at http://${host}:${port}/`);
	// connect to the mongoDB database
	connect();
	db.on('error', (err) => {
		log.error(err);
		// exit the process with a failure
		process.exit(1);
	});
});
