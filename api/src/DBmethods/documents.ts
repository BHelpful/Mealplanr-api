import { Schema, Document } from 'mongoose';
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
	stores: [Schema.Types.ObjectId];
	gCalendar: boolean;
}
export const UserOptionsSubschema = new Schema({
	diet: { type: String, required: true },
	country: { type: String, required: true },
	notifications: { type: Boolean, required: true },
	address: { type: UserOptionsAddressSubschema, required: false },
	stores: { type: [Schema.Types.ObjectId], required: true },
	gCalendar: { type: Boolean, required: true },
});

export interface PlanDocument extends Document {
	recipes: [Schema.Types.ObjectId];
	datedex: Date;
}
export const PlanSubschema = new Schema({
	recipes: { type: [Schema.Types.ObjectId], required: true },
	datedex: { type: Schema.Types.Date, required: true },
});

export interface ShoppingListItemDocument extends Document {
	ingredient: [Schema.Types.ObjectId];
	store: Schema.Types.ObjectId;
}
export const ShoppingListItemSubschema = new Schema({
	ingredient: { type: [Schema.Types.ObjectId], required: true },
	store: { type: Schema.Types.ObjectId, required: false },
});

export interface ShoppingListDocument extends Document {
	ingredients: [ShoppingListItemDocument];
}
export const ShoppingListSubschema = new Schema({
	ingredients: { type: [ShoppingListItemSubschema], required: true },
});

export interface RatingDocument extends Document {
	user: Schema.Types.ObjectId;
	rating: number;
}
export const RatingSubschema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true },
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

// ! Schemas------------------------------------------------------------------
export interface RecipeDocument extends Document {
	public: boolean;
	categories: [CategoryDocument['_id']];
	creator: UserDocument['_id'];
	title: string;
	description: string;
	estimate: Date;
	images: [string];
	ingredients: [IngredientDocument['_id']];
	preparation: [string];
	instructions: [string];
	rating: [RatingDocument];
	servings: number;
	sidedish: [RecipeDocument['_id']];
	createdAt: Date;
	updatedAt: Date;
}
export const RecipeSchema = new Schema(
	{
		public: { type: Boolean, default: false },
		categories: { type: [Schema.Types.ObjectId], ref: 'categories' },
		creator: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		estimate: { type: Schema.Types.Date, required: true },
		images: { type: [String] },
		ingredients: {
			type: [IngredientListSubschema],
			required: true,
		},
		preparation: { type: [String] },
		instructions: { type: [String], required: true },
		rating: { type: [RatingSubschema] },
		servings: { type: Number, required: true },
		sidedish: { type: [Schema.Types.ObjectId], ref: 'recipes' },
	},
	{ timestamps: true }
);

export interface IngredientDocument extends Document {
	type: string;
	season: string;
	diet: [string];
	alternatives: [IngredientDocument['_id']];
}
export const IngredientSchema = new Schema({
	type: { type: String, required: true },
	season: { type: String, required: true },
	diet: { type: [String], required: true },
	alternatives: { type: [Schema.Types.ObjectId], ref: 'ingredients' },
});

export interface CategoryDocument extends Document {
	same: string;
	recipes: [string];
}
export const CategorySchema = new Schema({
	same: { type: String, required: true },
	recipes: { type: [String], required: true },
});

export interface StoreDocument extends Document {
	name: string;
}
export const StoreSchema = new Schema({
	name: { type: String, required: true },
});
