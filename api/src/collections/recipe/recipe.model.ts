import mongoose, { Schema, Document } from 'mongoose';
const m2s = require('mongoose-to-swagger');
import { CategoryDocument } from '../category/category.model';
import {
	IngredientListSubschema,
	RatingDocument,
	RatingSubschema,
} from '../documents';
import { IngredientDocument } from '../ingredient/ingredient.model';
import { UserDocument } from '../user/user.model';

export interface RecipeDocument extends Document {
	public: boolean;
	categories: [CategoryDocument['_id']];
	creator: UserDocument['_id'];
	title: string;
	description: string;
	estimate: number;
	images: [Buffer];
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
		public: {
			type: Boolean,
			default: false,
			description: 'Whether the recipe should be publicly available',
		},
		categories: {
			type: [Schema.Types.ObjectId],
			ref: 'categories',
			description: 'ObjectId refering to categories collection',
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
			description: 'ObjectId refering to users collection',
		},
		title: {
			type: String,
			required: true,
			description: 'Title of the recipe',
		},
		description: {
			type: String,
			required: true,
			description: 'Description of the recipe',
		},
		estimate: {
			type: [Number],
			required: true,
			description:
				'Estimated time of the recipe (arr[0] is time, arr[1] is 1 or 2 mapped to m, h)',
		},
		images: {
			type: [Schema.Types.Buffer],
			description: 'Large storage type to store images of the recipe',
		},
		ingredients: {
			type: [IngredientListSubschema],
			required: true,
			description: 'List of ingredients',
		},
		preparation: { type: [String], description: 'Preparation steps' },
		instructions: {
			type: [String],
			required: true,
			description: 'Instructions for the recipe',
		},
		rating: {
			type: [RatingSubschema],
			description: 'Ratings of the recipe',
		},
		servings: {
			type: Number,
			required: true,
			description: 'Number of servings',
		},
		sidedish: {
			type: [Schema.Types.ObjectId],
			ref: 'recipes',
			description:
				'List of recipes that can be used as sidedish (ObjectId refering to recipes)',
		},
	},
	{ timestamps: true }
);

const recipeModel = mongoose.model<RecipeDocument>('recipes', RecipeSchema);

export const recipeSM = m2s(recipeModel);

export default recipeModel;
