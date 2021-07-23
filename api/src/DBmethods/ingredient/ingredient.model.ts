import mongoose, { Schema, Document } from 'mongoose';

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

const Ingredient = mongoose.model<IngredientDocument>(
	'ingredients',
	IngredientSchema
);

export default Ingredient;
