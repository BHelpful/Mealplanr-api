import { Request, Response, NextFunction } from 'express';
const sanitize = require('mongo-sanitize');

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
const sanitizeQuery = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.body = sanitize(req.body);
	return next();
};

export default sanitizeQuery;
