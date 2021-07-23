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
	streetname: { type: String, required: true },
	housenumber: { type: Number, required: true },
	postalcode: { type: String, required: true },
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
	diet: { type: String, required: true },
	country: { type: String, required: true },
	notifications: { type: Boolean, required: true },
	address: { type: UserOptionsAddressSubschema, required: false },
	stores: { type: [Schema.Types.ObjectId], ref: 'stores', required: true },
	gCalendar: { type: Boolean, required: true },
});

export interface PlanDocument extends Document {
	recipes: [RecipeDocument['_id']];
	datedex: Date;
}
export const PlanSubschema = new Schema({
	recipes: { type: [Schema.Types.ObjectId], ref: 'recipes', required: true },
	datedex: { type: Schema.Types.Date, required: true },
});

export interface ShoppingListItemDocument extends Document {
	ingredient: [IngredientDocument['_id']];
	store: StoreDocument['_id'];
}
export const ShoppingListItemSubschema = new Schema({
	ingredient: {
		type: [Schema.Types.ObjectId],
		ref: 'ingredients',
		required: true,
	},
	store: { type: Schema.Types.ObjectId, ref: 'stores', required: false },
});

export interface ShoppingListDocument extends Document {
	ingredients: [ShoppingListItemDocument];
}
export const ShoppingListSubschema = new Schema({
	ingredients: { type: [ShoppingListItemSubschema], required: true },
});

export interface RatingDocument extends Document {
	user: UserDocument['_id'];
	rating: number;
}
export const RatingSubschema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	rating: { type: Number, required: true },
});

export interface IngredientListDocument extends Document {
	ingredient: IngredientDocument['_id'];
	amount: number;
	unit: string;
}
export const IngredientListSubschema = new Schema({
	ingredient: {
		type: Schema.Types.ObjectId,
		ref: 'ingredients',
		required: true,
	},
	amount: { type: Number, required: true },
	unit: { type: String, required: true },
});
