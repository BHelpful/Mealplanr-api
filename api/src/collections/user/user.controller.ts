import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import {
	createUser,
	deleteUser,
	findAndUpdateUser,
	findUser,
} from './user.service';
import log from '../../logger';
import config from 'config';
import bcrypt from 'bcrypt';
import { findSessions } from '../session/session.service';

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

/**
 * This function is used to request the update of a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated user.
 */
export async function updateUserHandler(req: Request, res: Response) {
	const currUserMail = get(req, 'user.email');
	const userMail = get(req, 'query.userMail');
	const update = req.body;

	// TODO move to user.model.ts to something similar as UserSchema.pre('save')
	if (update.password) {
		// Random additional data
		const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

		const hash = await bcrypt.hashSync(update.password, salt);

		update.password = hash;
	}

	const user = await findUser({ email: userMail });

	if (!user) {
		return res.sendStatus(404);
	}

	if (String(user.email) !== currUserMail) {
		return res.sendStatus(401);
	}

	const updatedUser = await findAndUpdateUser({ email: userMail }, update, {
		lean: true,
		new: true,
		// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
		useFindAndModify: false,
	});

	return res.send(omit(updatedUser, 'password'));
}

/**
 * This function is used to request a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the user.
 */
export async function getUserHandler(req: Request, res: Response) {
	// get the user's id from the request
	const userId = get(req, 'user._id');

	const user = await findUser({ _id: userId });

	if (!user) {
		return res.status(404).send('User not found.');
	}

	return res.send(omit(user, 'password'));
}

/**
 * This function is used to check if a user exists.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with an anwser for if the user exists.
 */
export async function getUserExistsHandler(req: Request, res: Response) {
	const userMail = get(req, 'query.userMail');

	const user = await findUser({ email: userMail });

	if (!user) {
		return res.status(404).send('User not found.');
	}

	return res.send('User exists');
}

/**
 * This function is used to request the deletion of a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteUserHandler(req: Request, res: Response) {
	const currUserMail = get(req, 'user.email');
	const userMail = get(req, 'query.userMail');

	if (String(currUserMail) !== String(userMail)) {
		return res.sendStatus(401);
	}

	const user = await findUser({ email: userMail });

	if (!user) {
		return res.sendStatus(404);
	}

	await deleteUser({ email: userMail });

	return res.sendStatus(200);
}
