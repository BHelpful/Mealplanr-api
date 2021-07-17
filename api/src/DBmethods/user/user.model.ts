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

export interface UserDocument extends Document {
	Name: string;
	Email: string;
	Password: string;
	Colection: [Schema.Types.ObjectId];
	Options: UserOptionsDocument;
	Plan: PlanDocument;
	OAuth: string;
	Visited: Schema.Types.Date;
	AvailableIngredients: [Schema.Types.ObjectId];
	ShoppingList: ShoppingListDocument;
	comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema(
	{
		Name: { type: String, required: true },
		Email: { type: String, required: true, unique: true },
		Password: { type: String, required: true },
		Colection: { type: [Schema.Types.ObjectId], required: true },
		Options: { type: UserOptionsSubschema, required: true },
		Plan: { type: PlanSubschema, required: true },
		OAuth: { type: String, required: true },
		Visited: { type: Schema.Types.Date, required: true },
		AvailableIngredients: { type: [Schema.Types.ObjectId], required: true },
		ShoppingList: { type: ShoppingListSubschema, required: true },
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

	const hash = await bcrypt.hashSync(user.Password, salt);

	// Replace the password with the hash
	user.Password = hash;

	return next();
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.Password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
