import mongoose, { Schema, Document } from 'mongoose';
const m2s = require('mongoose-to-swagger');

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

const ingredientModel = mongoose.model<IngredientDocument>(
	'ingredients',
	IngredientSchema
);

export const ingredientSM = m2s(ingredientModel);

export default ingredientModel;
