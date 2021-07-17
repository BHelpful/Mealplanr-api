import { Schema, Document } from 'mongoose';

// ! Documents------------------------------------------------------------------
export interface UserOptionsAddressDocument extends Document {
	streetname: String;
	housenumber: Number;
	postalcode: String;
}
const UserOptionsAddressSubDocument = new Schema({
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
const UserOptionsSubDocument = new Schema({
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
const PlanSubDocument = new Schema({
	Recipes: { type: [Schema.Types.ObjectId], required: true },
	Datedex: { type: Schema.Types.Date, required: true },
});

export interface ShoppingListItemDocument extends Document {
	Ingredient: [Schema.Types.ObjectId];
	Store: Schema.Types.ObjectId;
}
const ShoppingListItemSubDocument = new Schema({
	Ingredient: { type: [Schema.Types.ObjectId], required: true },
	Store: { type: Schema.Types.ObjectId, required: false },
});

export interface ShoppingListDocument extends Document {
	Ingredients: [ShoppingListItemDocument];
}
const ShoppingListSubDocument = new Schema({
	Ingredients: { type: [ShoppingListItemSubDocument], required: true },
});

export interface RatingDocument extends Document {
	User: Schema.Types.ObjectId;
	Rating: Number;
}
const RatingSubDocument = new Schema({
	User: { type: Schema.Types.ObjectId, required: true },
	Rating: { type: Number, required: true },
});

// ! Schemas------------------------------------------------------------------
export interface IngredientDocument extends Document {
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
}
export const UserSchema = new Schema(
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

export interface RecipeDocument extends Document {
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
export const RecipeSchema = new Schema(
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

export interface IngredientDocument extends Document {
	Type: string;
	Season: string;
	Unit: string;
	Diet: [string];
	Alternatives: [Schema.Types.ObjectId];
}
export const IngredientSchema = new Schema({
	Type: { type: String, required: true },
	Season: { type: String, required: true },
	Unit: { type: String, required: true },
	Diet: { type: [String], required: true },
	Alternatives: { type: [Schema.Types.ObjectId], required: true },
});

export interface CategoryDocument extends Document {
	Name: string;
	Recipes: [string];
}
export const CategorySchema = new Schema({
	Name: { type: String, required: true },
	Recipes: { type: [String], required: true },
});

export interface StoreDocument extends Document {
	Name: string;
	createdAt: Date;
	updatedAt: Date;
}
export const StoreSchema = new Schema({
	Name: { type: String, required: true },
});
