import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import User, { UserDocument } from './user.model';

// Uses the .create() method on the User object (which is the mongoose schema of the users collection)
// In the same way as with the validation schema, any keys from the body of the requests
// that matches the keys from the mongoose schema will be added to the database.
// If there are required keys e.g. email, these need to be in the object in order to be accepted
// however this will already be checked for in the validation schema.
export async function createUser(input: DocumentDefinition<UserDocument>) {
	try {
		return await User.create(input);
	} catch (error) {
		throw new Error(error);
	}
}

// This method uses mongoose to find a user from the DB based on a querry.
export async function findUser(query: FilterQuery<UserDocument>) {
	return User.findOne(query).lean();
}

// This function finds a user based on the unique email and uses the method
// defined in the user model to check if the password is valid to the given user
// The password will then be omitted from the user as to not allow for outside
// asses to the user's passwords.
export async function validatePassword({
	email,
	password,
}: {
	email: UserDocument['email'];
	password: string;
}) {
	const user = await User.findOne({ email });

	if (!user) {
		return false;
	}

	const isValid = await user.comparePassword(password);

	if (!isValid) {
		return false;
	}

	return omit(user.toJSON(), 'password');
}
