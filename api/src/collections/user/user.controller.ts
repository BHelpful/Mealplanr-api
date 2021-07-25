import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from './user.service';
import log from '../../logger';

/**
 * This function is used to request the creation of a new user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the user omitted the password.
 */
export async function createUserHandler(req: Request, res: Response) {
	try {
		const user = await createUser(req.body);
		// Removes password from the user object using omit instead of delete.
		// This is because we don't want the password to be accesable later only
		// in its hashed state.
		return res.status(200).send(omit(user.toJSON(), 'password'));
	} catch (e) {
		log.error(e);
		// Sets status code to 409, which is a conflict error.
		return res.status(409).send(e.message);
	}
}
