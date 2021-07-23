import mongoose, { Schema, Document } from 'mongoose';

export interface StoreDocument extends Document {
	name: string;
}
export const StoreSchema = new Schema({
	name: { type: String, required: true },
});

const StoreModel = mongoose.model<StoreDocument>('store', StoreSchema);

export default StoreModel;
