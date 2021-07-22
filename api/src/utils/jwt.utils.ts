import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get('privateKey') as string;

/**
 * This function is used to generate a JWT token.
 *
 * @remarks
 * Uses the private key from the config file.
 *
 * @param object - an object
 * @param options - a set of options from the JWT library (SignOptions)
 * @returns a JWT token
 */
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, privateKey, options);
}

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
export function decode(token: string) {
	try {
		const decoded = jwt.verify(token, privateKey);

		return { valid: true, expired: false, decoded };
	} catch (error) {
		return {
			valid: false,
			expired: error.message === 'jwt expired',
			decoded: null,
		};
	}
}
