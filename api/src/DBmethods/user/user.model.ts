import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import {
	PlanDocument,
	PlanSubschema,
	ShoppingListDocument,
	ShoppingListSubschema,
	UserOptionsDocument,
	UserOptionsSubschema,
} from '../documents';
import log from '../../logger';

export interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	colection: [Schema.Types.ObjectId];
	options: UserOptionsDocument;
	plan: PlanDocument;
	oAuth: string;
	availableIngredients: [Schema.Types.ObjectId];
	shoppingList: ShoppingListDocument;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: false },
		colection: { type: [Schema.Types.ObjectId], required: false },
		options: { type: UserOptionsSubschema, required: false },
		plan: { type: PlanSubschema, required: false },
		oAuth: { type: String, required: false },
		availableIngredients: {
			type: [Schema.Types.ObjectId],
			required: false,
		},
		shoppingList: { type: ShoppingListSubschema, required: false },
	},
	{ timestamps: true }
);

// we need to get user's password into a hash before it is added to the database
// this is done in the model using the bcrypt
UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
	let user = this as UserDocument;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// Random additional data
	const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

	const hash = await bcrypt.hashSync(user.password, salt);

	// Replace the password with the hash
	user.password = hash;

	return next();
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('users', UserSchema);

export default User;
