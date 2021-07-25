import { Schema, Document } from 'mongoose';
import { IngredientDocument } from './ingredient/ingredient.model';
import { RecipeDocument } from './recipe/recipe.model';
import { StoreDocument } from './store/store.model';
import { UserDocument } from './user/user.model';

// ! Documents------------------------------------------------------------------
// This contains the different subschemas (documents) used in the different schemas (collections) of mongoDB. E.g. the collection of a user contains a document for options.
export interface UserOptionsAddressDocument extends Document {
	streetname: string;
	housenumber: number;
	postalcode: string;
}
export const UserOptionsAddressSubschema = new Schema({
	streetname: {
		type: String,
		required: true,
		description: 'The street name where the user lives',
	},
	housenumber: {
		type: Number,
		required: true,
		description: 'The house number',
	},
	postalcode: {
		type: String,
		required: true,
		description: 'Postal code of the address',
	},
});

export interface UserOptionsDocument extends Document {
	diet: string;
	country: string;
	notifications: boolean;
	address: UserOptionsAddressDocument;
	stores: [StoreDocument['_id']];
	gCalendar: boolean;
}
export const UserOptionsSubschema = new Schema({
	diet: {
		type: String,
		required: true,
		description: 'The diet of the user.',
	},
	country: {
		type: String,
		required: true,
		description: 'Country of the user',
	},
	notifications: {
		type: Boolean,
		required: true,
		description: 'Whether or not the user wants to recieve notifications',
	},
	address: {
		type: UserOptionsAddressSubschema,
		required: false,
		description: 'Address of the user',
	},
	stores: {
		type: [Schema.Types.ObjectId],
		ref: 'stores',
		required: true,
		description: 'List of stores the user is wants to shop in.',
	},
	gCalendar: {
		type: Boolean,
		required: true,
		description: 'Is the user subscribed to Google Calendar',
	},
});

export interface PlanDocument extends Document {
	recipes: [RecipeDocument['_id']];
	datedex: Date;
}
export const PlanSubschema = new Schema({
	recipes: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
		required: true,
		description: 'The recipes that are part of this plan.',
	},
	datedex: {
		type: Schema.Types.Date,
		required: true,
		description:
			'The start date of the plan (this defines what the 7 days of the plan is going to be)',
	},
});

export interface IngredientListDocument extends Document {
	ingredient: IngredientDocument['_id'];
	amount: number;
	unit: string;
	store: StoreDocument;
}
export const IngredientListSubschema = new Schema({
	ingredient: {
		type: Schema.Types.ObjectId,
		ref: 'ingredients',
		required: true,
		description: 'ObjectId refering to ingredients',
	},
	amount: {
		type: Number,
		required: true,
		description: 'The amount of the ingredient.',
	},
	unit: {
		type: String,
		required: true,
		description: 'The unit of the amount of the ingredient.',
	},
	store: {
		type: Schema.Types.ObjectId,
		ref: 'stores',
		required: false,
		description: 'The store relevant to the ingredient',
	},
});

export interface ShoppingListDocument extends Document {
	ingredients: [IngredientListDocument];
}
export const ShoppingListSubschema = new Schema({
	ingredients: {
		type: [IngredientListSubschema],
		required: true,
		description: 'List of ingredients',
	},
});

export interface RatingDocument extends Document {
	user: UserDocument['_id'];
	rating: number;
}
export const RatingSubschema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
		description:
			'The user who rated the recipe. (ObjectId refering to users)',
	},
	rating: { type: Number, required: true, description: 'Rating from 1 to 5' },
});
