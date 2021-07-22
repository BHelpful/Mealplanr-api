import { Express, Request, Response } from 'express';
import { createUserSessionHandler } from './DBmethods/session/session.controller';
import { createUserSessionSchema } from './DBmethods/session/session.schema';
import { createUserHandler } from './DBmethods/user/user.controller';
import { createUserSchema } from './DBmethods/user/user.schema';
import validateRequest from './middleware/validateRequest';

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

	// get user's sessions

	// logout
}
