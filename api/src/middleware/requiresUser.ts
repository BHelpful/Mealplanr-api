import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

/**
 * This function is middleware used to check if there is a user
 *
 * @remarks
 * The usecase is to check if a user is logged in before
 * e.g. running the seqence to log the user out.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns next function
 */
const requiresUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = get(req, 'user');
	log.info("just checked for user");

	if (!user) {
		log.info("user is not logged in");
		return res.sendStatus(403);
	}

	return next();
};

export default requiresUser;
