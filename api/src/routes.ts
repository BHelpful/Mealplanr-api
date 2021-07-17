import {Express, Request, Response} from 'express';

export default function (app: Express) {
	app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

	// register user with
	// app.get("/api/users", validateRequest(createUserSchema), createUserHandler);
	// login

	// get user's sessions

	// logout
}