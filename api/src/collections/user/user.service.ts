import { DocumentDefinition, FilterQuery } from 'mongoose';
import userModel, { UserDocument } from './user.model';

/**
 * This function is used to create a new user.
 *
 * @remarks
 * Uses the .create() method on the User object (which is the mongoose schema of the users collection)
 * In the same way as with the validation schema, any keys from the body of the requests
 * that matches the keys from the mongoose schema will be added to the database.
 * If there are required keys e.g. email, these need to be in the object in order to be accepted
 * however this will already be checked for in the validation schema.
 *
 * @param input - The user object to be created.
 * @returns - The created user object.
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
	try {
		return await userModel.create(input);
	} catch (error) {
		throw new Error(error);
	}
}

/**
 * This function uses mongoose to find a user from the DB based on a querry.
 *
 * @param query - a query object that will be used to find a user from the DB
 * @returns a promise that resolves to the user that was found
 */
export async function findUser(query: FilterQuery<UserDocument>) {
	return userModel.findOne(query).lean();
}
