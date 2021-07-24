import mongoose, { Schema, Document } from 'mongoose';
const m2s = require('mongoose-to-swagger');

export interface CategoryDocument extends Document {
	same: string;
	recipes: [string];
}
export const CategorySchema = new Schema({
	same: { type: String, required: true },
	recipes: { type: [String], required: true },
});

const categoryModel = mongoose.model<CategoryDocument>('category', CategorySchema);

export const categorySM = m2s(categoryModel);

export default categoryModel;
