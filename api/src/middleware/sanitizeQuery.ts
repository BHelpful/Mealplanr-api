import { Request, Response, NextFunction } from 'express';
const sanitize = require('mongo-sanitize');

/**
 * This function is middleware used to prevent NoSQL injection
 *
 * @remarks
 * The usecase is to sanitize all queries from the user before execution.
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
	req.query = sanitize(req.query);
	req.params = sanitize(req.params);
	next();
};

export default sanitizeQuery;
