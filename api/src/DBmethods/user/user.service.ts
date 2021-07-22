import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from './user.model';

// Uses the .create() method on the User object (which is the mongoose schema of the users collection)
// In the same way as with the validation schema, any keys from the body of the requests
// that matches the keys from the mongoose schema will be added to the database.
// If there are required keys e.g. email, these need to be in the object in order to be accepted
// however this will already be checked for in the validation schema.
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
export async function createUser(input: DocumentDefinition<UserDocument>) {
	try {
		return await User.create(input);
	} catch (error) {
		throw new Error(error);
	}
}

// This method uses mongoose to find a user from the DB based on a querry.
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
export async function findUser(query: FilterQuery<UserDocument>) {
	return User.findOne(query).lean();
}
