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
			tags: ['users'],
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
					schema: omit(userSM, 'password'),
				},
				'409': {
					description: 'Conflict error - user already exists',
				},
			},
		},
	};
	// Create a new user
	app.post(
		'/api/users',
		validateRequest(createUserSchema),
		createUserHandler
	);
	parsedSwaggerDoc.paths['/api/users'] = usersPost;

	const sessionsPost = {
		post: {
			summary: 'Log in',
			description:
				'Create a new session for the user (thereby logging in)',
			tags: ['sessions'],
			produces: ['application/json'],
			parameters: [
				{
					name: 'body',
					in: 'body',
					description: 'Create session body object',
					required: true,
					schema: {
						type: 'object',
						properties: sessionPostStructure,
					},
				},
			],
			responses: {
				'200': {
					description: 'OK',
					schema: {
						type: 'object',
						properties: {
							accessToken: {
								type: 'string',
								example: 'JWT accessToken',
							},
							refreshToken: {
								type: 'string',
								example: 'JWT accessToken',
							},
						},
					},
				},
			},
		},
	};
	// login
	app.post(
		'/api/sessions',
		validateRequest(createUserSessionSchema),
		createUserSessionHandler
	);

	const sessionsGet = {
		get: {
			summary: 'Get all active sessions',
			description: 'Gets all the sessions that is still valid',
			tags: ['sessions'],
			produces: ['application/json'],
			parameters: [
				{
					in: 'header',
					name: 'x-refresh',
					description: 'refreshToken',
					required: true,
					schema: {
						type: 'string',
						format: 'uuid',
					},
				},
				{
					in: 'header',
					name: 'authorization',
					description: 'accessToken',
					required: true,
					schema: {
						type: 'string',
						format: 'uuid',
					},
				},
			],
			responses: {
				'200': {
					description: 'OK',
					schema: { type: 'array', items: sessionSM },
				},
			},
		},
	};
	// Get the user's valid sessions i.e. the sessions where the user is logged in.
	app.get('/api/sessions', requiresUser, getUserSessionsHandler);

	const sessionsDelete = {
		delete: {
			summary: 'Logout',
			description:
				"Invalidate a user's session, which will in turn log the user out",
			tags: ['sessions'],
			produces: ['application/json'],
			parameters: [
				{
					in: 'header',
					name: 'x-refresh',
					description: 'refreshToken',
					required: true,
					schema: {
						type: 'string',
						format: 'uuid',
					},
				},
				{
					in: 'header',
					name: 'authorization',
					description: 'accessToken',
					required: true,
					schema: {
						type: 'string',
						format: 'uuid',
					},
				},
			],
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	};
	// logout (invalidate a user's session)
	app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

	parsedSwaggerDoc.paths['/api/sessions'] = {
		...sessionsPost,
		...sessionsGet,
		...sessionsDelete,
	};

	// set up the Swagger UI
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(parsedSwaggerDoc));
}
