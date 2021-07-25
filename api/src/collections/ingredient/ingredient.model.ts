import mongoose, { Schema, Document } from 'mongoose';
import { CategoryDocument } from '../category/category.model';
const m2s = require('mongoose-to-swagger');

export interface IngredientDocument extends Document {
	type: CategoryDocument['_id'];
	season: string;
	diet: [string];
	alternatives: [IngredientDocument['_id']];
}
export const IngredientSchema = new Schema({
	type: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
		required: true,
		description: 'ObjectId refering to categories',
	},
	season: {
		type: String,
		required: true,
		description: 'The season of the ingredient e.g. spring',
	},
	diet: { type: [String], required: true },
	alternatives: { type: [Schema.Types.ObjectId], ref: 'ingredients' },
});

const ingredientModel = mongoose.model<IngredientDocument>(
	'ingredients',
	IngredientSchema
);

export const ingredientSM = m2s(ingredientModel);

export default ingredientModel;
