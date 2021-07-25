import { Express, Request, Response } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from './collections/session/session.controller';
import {
	createUserSessionSchema,
	sessionPostStructure,
} from './collections/session/session.schema';
import { createUserHandler } from './collections/user/user.controller';
import { categorySM } from './collections/category/category.model';
import { ingredientSM } from './collections/ingredient/ingredient.model';
import { recipeSM } from './collections/recipe/recipe.model';
import { sessionSM } from './collections/session/session.model';
import { storeSM } from './collections/store/store.model';
import { userSM } from './collections/user/user.model';
import {
	createUserSchema,
	userPostStructure,
} from './collections/user/user.schema';
import { requiresUser, validateRequest } from './middleware';

// swagger configuration
import * as swaggerDocument from './swagger.json';
import { omit } from 'lodash';
const swaggerUI = require('swagger-ui-express');

/**
 * This function is the entry point for all routes in the API.
 *
 * @param app - The Express app.
 */
export default function (app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) =>
		res.sendStatus(200)
	);

	

	

	parsedSwaggerDoc.paths['/api/sessions'] = {
		...sessionsPost,
		...sessionsGet,
		...sessionsDelete,
	};

	// set up the Swagger UI
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(parsedSwaggerDoc));
}
