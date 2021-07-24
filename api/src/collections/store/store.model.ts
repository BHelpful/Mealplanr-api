import mongoose, { Schema, Document } from 'mongoose';
const m2s = require('mongoose-to-swagger');

export interface StoreDocument extends Document {
	name: string;
}
export const StoreSchema = new Schema({
	name: { type: String, required: true },
});

const storeModel = mongoose.model<StoreDocument>('store', StoreSchema);

export const storeSM = m2s(storeModel);

export default storeModel;
