import { Schema, Document } from 'mongoose';

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

// ! Schemas------------------------------------------------------------------
interface RecipeDocument extends Document {
	public: boolean;
	categories: [Schema.Types.ObjectId];
	creator: Schema.Types.ObjectId;
	title: string;
	description: string;
	estimate: Date;
	images: [string];
	ingredients: [Schema.Types.ObjectId];
	preparation: [string];
	instructions: [string];
	rating: [RatingDocument];
	servings: number;
	sidedish: [Schema.Types.ObjectId];
	createdAt: Date;
	updatedAt: Date;
}
const RecipeSchema = new Schema(
	{
		public: { type: Boolean, required: true },
		categories: { type: [Schema.Types.ObjectId], required: true },
		creator: { type: Schema.Types.ObjectId, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		estimate: { type: Schema.Types.Date, required: true },
		images: { type: [String], required: true },
		ingredients: { type: [Schema.Types.ObjectId], required: true },
		preparation: { type: [String], required: true },
		instructions: { type: [String], required: true },
		rating: { type: [RatingSubschema], required: true },
		servings: { type: Number, required: true },
		sidedish: { type: [Schema.Types.ObjectId], required: true },
	},
	{ timestamps: true }
);

interface IngredientDocument extends Document {
	type: string;
	season: string;
	unit: string;
	diet: [string];
	alternatives: [Schema.Types.ObjectId];
}
const IngredientSchema = new Schema({
	type: { type: String, required: true },
	season: { type: String, required: true },
	unit: { type: String, required: true },
	diet: { type: [String], required: true },
	alternatives: { type: [Schema.Types.ObjectId], required: true },
});

interface CategoryDocument extends Document {
	same: string;
	recipes: [string];
}
const CategorySchema = new Schema({
	same: { type: String, required: true },
	recipes: { type: [String], required: true },
});

interface StoreDocument extends Document {
	name: string;
}
const StoreSchema = new Schema({
	name: { type: String, required: true },
});
