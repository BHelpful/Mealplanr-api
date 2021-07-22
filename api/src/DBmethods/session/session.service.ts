import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import config from 'config';
import { get, omit } from 'lodash';
import User, { UserDocument } from '../user/user.model';
import Session, { SessionDocument } from './session.model';
import { sign, decode } from '../../utils/jwt.utils';
import { findUser } from '../user/user.service';

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


export async function createSession(userId: string, userAgent: string) {
	const session = await Session.create({ user: userId, userAgent });

	return session.toJSON();
}

export function createAccessToken({
	user,
	session,
}: {
	user:
		| Omit<UserDocument, 'password'>
		| LeanDocument<Omit<UserDocument, 'password'>>;
	session:
		| Omit<SessionDocument, 'password'>
		| LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
	// Build and return the new access token
	const accessToken = sign(
		{ ...user, session: session._id },
		{ expiresIn: config.get('accessTokenTtl') } // 15 minutes
	);

	return accessToken;
}

export async function reIssueAccessToken({
	refreshToken,
}: {
	refreshToken: string;
}) {
	// Decode the refresh token
	const { decoded } = decode(refreshToken);

	if (!decoded || !get(decoded, '_id')) return false;

	// Get the session
	const session = await Session.findById(get(decoded, '_id'));

	// Make sure the session is still valid
	if (!session || !session?.valid) return false;

	const user = await findUser({ _id: session.user });

	if (!user) return false;

	const accessToken = createAccessToken({ user, session });

	return accessToken;
}

export async function updateSession(
	query: FilterQuery<SessionDocument>,
	update: UpdateQuery<SessionDocument>
) {
	return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
	return Session.find(query).lean();
}
