import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
	same: string;
	recipes: [string];
}
export const CategorySchema = new Schema({
	same: { type: String, required: true },
	recipes: { type: [String], required: true },
});

const CategoryModel = mongoose.model<CategoryDocument>(
	'category',
	CategorySchema
);

export default CategoryModel;
