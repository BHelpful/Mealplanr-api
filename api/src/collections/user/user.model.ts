import { Schema, Document, model, HookNextFunction } from 'mongoose';
const m2s = require('mongoose-to-swagger');
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
import { RecipeDocument } from '../recipe/recipe.model';
import { IngredientDocument } from '../ingredient/ingredient.model';

export interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	colection: [RecipeDocument['_id']];
	options: UserOptionsDocument;
	plan: PlanDocument;
	oAuth: string;
	availableIngredients: [IngredientDocument['_id']];
	shoppingList: ShoppingListDocument;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema(
	{
		name: { type: String, required: true, description: 'Name of the user' },
		email: {
			type: String,
			required: true,
			unique: true,
			description: 'Email of the user',
		},
		password: { type: String, description: 'Password of the user' },
		colection: {
			type: [Schema.Types.ObjectId],
			ref: 'recipes',
			description:
				'List of recipes now owned by the user (ObjectId refering to recipes)',
		},
		options: { type: UserOptionsSubschema, description: 'User options' },
		plan: { type: PlanSubschema, description: 'The mealplan of the user' },
		oAuth: { type: String, description: 'OAuth of the user' },
		availableIngredients: {
			type: [Schema.Types.ObjectId],
			ref: 'ingredients',
			description:
				'List of ingredients already available to the user at home',
		},
		shoppingList: {
			type: ShoppingListSubschema,
			description: 'Shopping list of the user',
		},
	},
	{ timestamps: true }
);

// we need to get user's password into a hash before it is added to the database
// this is done in the model using the bcrypt
UserSchema.pre('save', async function (next: HookNextFunction) {
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

/**
 * This function encrupts a password and validates
 * with the existing encrypted password from the user.
 *
 * @remarks
 * This function is added to the UserSchema.
 *
 * @param candidatePassword - a password to compare against the user's password
 * @returns a boolean value indicating whether the password is correct
 */
UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const userModel = model<UserDocument>('users', UserSchema);

export const userSM = m2s(userModel);

export default userModel;
