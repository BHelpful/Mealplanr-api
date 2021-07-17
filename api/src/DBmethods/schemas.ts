import { Schema } from 'mongoose';

// ! Documents------------------------------------------------------------------
const UserOptionsAddressDocument = new Schema({
	streetname: { type: String, required: true },
	housenumber: { type: Number, required: true },
	postalcode: { type: String, required: true },
});

const UserOptionsDocument = new Schema({
	Diet: { type: String, required: true },
	Country: { type: String, required: true },
	Notifications: { type: Boolean, required: true },
	Address: { type: UserOptionsAddressDocument, required: false },
	Stores: { list: [Schema.Types.ObjectId], required: true },
	GCalendar: { type: Boolean, required: true },
});

const PlanDocument = new Schema({
	Recipes: { type: [Schema.Types.ObjectId], required: true },
	Datedex: { type: Schema.Types.Date, required: true },
});

const ShoppingListItemDocument = new Schema({
	Ingredient: { type: [Schema.Types.ObjectId], required: true },
	Store: { type: Schema.Types.ObjectId, required: false },
});

const ShoppingListDocument = new Schema({
	Ingredients: { type: [ShoppingListItemDocument], required: true },
});

const RatingDocument = new Schema({
	User: { type: Schema.Types.ObjectId, required: true },
	Rating: { type: Number, required: true },
});

// ! Schemas------------------------------------------------------------------
export const UserSchema = new Schema(
	{
		Name: { type: String, required: true },
		Email: { type: String, required: true, unique: true },
		Password: { type: String, required: true },
		Colection: { type: [Schema.Types.ObjectId], required: true },
		Options: { type: UserOptionsDocument, required: true },
		Plan: { type: PlanDocument, required: true },
		OAuth: { type: String, required: true },
		Visited: { type: Schema.Types.Date, required: true },
		AvailableIngredients: { type: [Schema.Types.ObjectId], required: true },
		ShoppingList: { type: ShoppingListDocument, required: true },
	},
	{ timestamps: true }
);

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
		Rating: { type: [RatingDocument], required: true },
		Servings: { type: Number, required: true },
		Sidedish: { type: [Schema.Types.ObjectId], required: true },
	},
	{ timestamps: true }
);

export const IngredientSchema = new Schema({
	Type: { type: String, required: true },
	Season: { type: String, required: true },
	Unit: { type: String, required: true },
	Diet: { type: [String], required: true },
	Alternatives: { type: [Schema.Types.ObjectId], required: true },
});

export const CategorySchema = new Schema({
	Name: { type: String, required: true },
	Recipes: { type: [String], required: true },
});

export const StoreSchema = new Schema({
	Name: { type: String, required: true },
});
