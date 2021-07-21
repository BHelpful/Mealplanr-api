import { Express, Request, Response } from 'express';
import { createUserHandler } from './DBmethods/user/user.controller';
import { createUserSchema } from './DBmethods/user/user.schema';
import validateRequest from './middleware/validateRequest';

export default function (app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) =>
		res.sendStatus(200)
	);

	// register user with
	app.post(
		'/api/users',
		validateRequest(createUserSchema),
		createUserHandler
	);
	// login

	// get user's sessions

	// logout
}
