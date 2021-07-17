import { Schema, Document } from 'mongoose';

// ! Documents------------------------------------------------------------------
export interface UserOptionsAddressDocument extends Document {
	streetname: String;
	housenumber: Number;
	postalcode: String;
}
export const UserOptionsAddressSubDocument = new Schema({
	streetname: { type: String, required: true },
	housenumber: { type: Number, required: true },
	postalcode: { type: String, required: true },
});

export interface UserOptionsDocument extends Document {
	Diet: String;
	Country: String;
	Notifications: Boolean;
	Address: UserOptionsAddressDocument;
	Stores: [Schema.Types.ObjectId];
	GCalendar: Boolean;
}
export const UserOptionsSubDocument = new Schema({
	Diet: { type: String, required: true },
	Country: { type: String, required: true },
	Notifications: { type: Boolean, required: true },
	Address: { type: UserOptionsAddressSubDocument, required: false },
	Stores: { type: [Schema.Types.ObjectId], required: true },
	GCalendar: { type: Boolean, required: true },
});

export interface PlanDocument extends Document {
	Recipes: [Schema.Types.ObjectId];
	Datedex: Date;
}
export const PlanSubDocument = new Schema({
	Recipes: { type: [Schema.Types.ObjectId], required: true },
	Datedex: { type: Schema.Types.Date, required: true },
});

export interface ShoppingListItemDocument extends Document {
	Ingredient: [Schema.Types.ObjectId];
	Store: Schema.Types.ObjectId;
}
export const ShoppingListItemSubDocument = new Schema({
	Ingredient: { type: [Schema.Types.ObjectId], required: true },
	Store: { type: Schema.Types.ObjectId, required: false },
});

export interface ShoppingListDocument extends Document {
	Ingredients: [ShoppingListItemDocument];
}
export const ShoppingListSubDocument = new Schema({
	Ingredients: { type: [ShoppingListItemSubDocument], required: true },
});

export interface RatingDocument extends Document {
	User: Schema.Types.ObjectId;
	Rating: Number;
}
export const RatingSubDocument = new Schema({
	User: { type: Schema.Types.ObjectId, required: true },
	Rating: { type: Number, required: true },
});

// ! Schemas------------------------------------------------------------------
interface RecipeDocument extends Document {
	Public: boolean;
	Categories: [Schema.Types.ObjectId];
	Creator: Schema.Types.ObjectId;
	Title: String;
	Description: String;
	Estimate: Date;
	Images: [String];
	Ingredients: [Schema.Types.ObjectId];
	Preparation: [String];
	Instructions: [String];
	Rating: [RatingDocument];
	Servings: Number;
	Sidedish: [Schema.Types.ObjectId];
}
const RecipeSchema = new Schema(
	{
		Public: { type: Boolean, required: true },
		Categories: { type: [Schema.Types.ObjectId], required: true },
		Creator: { type: Schema.Types.ObjectId, required: true },
		Title: { type: String, required: true },
		Description: { type: String, required: true },
		Estimate: { type: Schema.Types.Date, required: true },
		Images: { type: [String], required: true },
		Ingredients: { type: [Schema.Types.ObjectId], required: true },
		Preparation: { type: [String], required: true },
		Instructions: { type: [String], required: true },
		Rating: { type: [RatingSubDocument], required: true },
		Servings: { type: Number, required: true },
		Sidedish: { type: [Schema.Types.ObjectId], required: true },
	},
	{ timestamps: true }
);

interface IngredientDocument extends Document {
	Type: string;
	Season: string;
	Unit: string;
	Diet: [string];
	Alternatives: [Schema.Types.ObjectId];
}
const IngredientSchema = new Schema({
	Type: { type: String, required: true },
	Season: { type: String, required: true },
	Unit: { type: String, required: true },
	Diet: { type: [String], required: true },
	Alternatives: { type: [Schema.Types.ObjectId], required: true },
});

interface CategoryDocument extends Document {
	Name: string;
	Recipes: [string];
}
const CategorySchema = new Schema({
	Name: { type: String, required: true },
	Recipes: { type: [String], required: true },
});

interface StoreDocument extends Document {
	Name: string;
	createdAt: Date;
	updatedAt: Date;
}
const StoreSchema = new Schema({
	Name: { type: String, required: true },
});
