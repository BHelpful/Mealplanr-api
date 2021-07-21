import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from './user.service';
import log from '../../logger';

export async function createUserHandler(req: Request, res: Response) {
	try {
		const user = await createUser(req.body);
		// Removes password from response using omit instead of delete.
		// This is because we don't want the password to be accesable later only
		// in its non-hashed state.
		return res.send(omit(user.toJSON(), 'password'));
	} catch (e) {
		log.error(e);
		// Sets status code to 409, which is a conflict error.
		return res.status(409).send(e.message);
	}
}
