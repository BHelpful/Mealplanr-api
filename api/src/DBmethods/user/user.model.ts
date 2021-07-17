import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import {
	PlanDocument,
	PlanSubDocument,
	ShoppingListDocument,
	ShoppingListSubDocument,
	UserOptionsDocument,
	UserOptionsSubDocument,
} from '../documents';

export interface UserDocument extends Document {
	Name: String;
	Email: String;
	Password: String;
	Colection: [Schema.Types.ObjectId];
	Options: UserOptionsDocument;
	Plan: PlanDocument;
	OAuth: String;
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
		Options: { type: UserOptionsSubDocument, required: true },
		Plan: { type: PlanSubDocument, required: true },
		OAuth: { type: String, required: true },
		Visited: { type: Schema.Types.Date, required: true },
		AvailableIngredients: { type: [Schema.Types.ObjectId], required: true },
		ShoppingList: { type: ShoppingListSubDocument, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
