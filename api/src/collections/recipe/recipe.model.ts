import mongoose, { Schema, Document } from 'mongoose';
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

const Recipe = mongoose.model<RecipeDocument>('recipes', RecipeSchema);

export default Recipe;
