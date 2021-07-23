import { Express, Request, Response } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from './collections/session/session.controller';
import { createUserSessionSchema } from './collections/session/session.schema';
import { createUserHandler } from './collections/user/user.controller';
import { createUserSchema } from './collections/user/user.schema';
import { requiresUser, validateRequest } from './middleware';

/**
 * This function is the entry point for all routes in the API.
 *
 * @param app - The Express app.
 */
export default function (app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) =>
		res.sendStatus(200)
	);

	// register user (validating the body of the request before calling the method to create a new user).
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
}
