import { Express, Request, Response } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from './collections/session/session.controller';
import { createUserSessionSchema } from './collections/session/session.schema';
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
	var parsedSwaggerDoc = JSON.parse(JSON.stringify(swaggerDocument));

	// Adding mongoose models to swagger docs
	parsedSwaggerDoc.definitions.Ingredient = ingredientSM;
	parsedSwaggerDoc.definitions.Category = categorySM;
	parsedSwaggerDoc.definitions.Session = sessionSM;
	parsedSwaggerDoc.definitions.Store = storeSM;
	parsedSwaggerDoc.definitions.Recipe = recipeSM;
	parsedSwaggerDoc.definitions.User = userSM;

	app.get('/healthcheck', (req: Request, res: Response) =>
		res.sendStatus(200)
	);

	const usersPost = {
		post: {
			summary: 'Register user',
			description:
				'Register user (validating the body of the request before calling the method to create a new user)',
			tags: ['user'],
			produces: ['application/json'],
			parameters: [
				{
					name: 'body',
					in: 'body',
					description: 'Create user body object',
					required: true,
					schema: {
						type: 'object',
						properties: userPostStructure,
					},
				},
			],
			responses: {
				'200': {
					description: 'OK',
					// TODO create schema yourself containing only the information that is send back. (but keep the omit version to user elsewhere)
					schema: omit(userSM, 'password'),
				},
				'409': {
					description: 'Conflict error - user already exists',
				},
			},
		},
	};
	// Create a new user
	parsedSwaggerDoc.paths['/api/users'] = usersPost;
	app.post(
		'/api/users',
		validateRequest(createUserSchema),
		createUserHandler
	);

	// login
	app.post(
		'/api/sessions',
		validateRequest(createUserSessionSchema),
		createUserSessionHandler
	);

	// Get the user's valid sessions i.e. the sessions where the user is logged in.
	app.get('/api/sessions', requiresUser, getUserSessionsHandler);

	// logout (invalidate a user's session)
	app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

	// set up the Swagger UI
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(parsedSwaggerDoc));
}
